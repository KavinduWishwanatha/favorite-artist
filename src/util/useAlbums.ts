import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import type { RootState } from '../redux/reducer';
import type { IAlbum } from '../@types';
import { MAX_TOTAL_PAGES } from '../constant';
import { useGetAlbums, useGetArtistInfo } from '../api/lastFmHook';

export const useAlbums = () => {
  const [currentIndex, setIndex] = useState(1);
  const [showMore, setShowMore] = useState(true);
  const [dataSet, setDataset] = useState<IAlbum[]>([]);

  const selectedArtist = useSelector((state: RootState) => state.favourite.artist);
  const {
    isLoading: artistLoading,
    data: artist,
    refetch: getArtist,
  } = useGetArtistInfo(selectedArtist);
  const {
    isLoading: loading,
    data: albums,
    refetch: listAlbums,
    isRefetching: refetching,
  } = useGetAlbums(selectedArtist, currentIndex);

  useEffect(() => {
    const totalPages = Number((albums && albums.topalbums['@attr']['totalPages']) || 1);
    const pageCount = totalPages > MAX_TOTAL_PAGES ? MAX_TOTAL_PAGES : totalPages;
    if (currentIndex <= pageCount) {
      listAlbums();
    } else {
      setShowMore(false);
    }
  }, [currentIndex]);

  useEffect(() => {
    setIndex(1);
    setDataset([]);
    getArtist();
    listAlbums();
  }, [selectedArtist]);

  useEffect(() => {
    if (albums?.error) {
      toast.error(albums.message);
    } else {
      const data = albums && albums.topalbums?.album.filter((i) => i.mbid);
      data && setDataset([...dataSet, ...data]);
    }
  }, [albums]);

  return { showMore, artistLoading, artist, loading, refetching, dataSet, setIndex, currentIndex };
};
