import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/reducer';
import type { ITrack } from '../@types';
import { DEFAULT_ALBUM_IMAGE } from '../constant';
import { useGetAlbumTracks } from '../api/lastFmHook';

interface Props {
  mbid: string;
}

export const useAlbum = ({ mbid }: Props) => {
    const [dataSet, setDataset] = useState<ITrack[]>([]);
    const [albumImage, setAlbumImage] = useState(
      DEFAULT_ALBUM_IMAGE
    );
    const selectedArtist = useSelector((state: RootState) => state.favourite.artist);
    const { isLoading: albumLoading, data: album } = useGetAlbumTracks(selectedArtist, String(mbid));
  
    useEffect(() => {
      if (album) {
        setDataset(album.tracks ? Array.isArray(album.tracks.track)? album.tracks.track : [album.tracks.track]  : []);
        setAlbumImage(
          album.image[3]['#text'] ||
            DEFAULT_ALBUM_IMAGE
        );
      }
    }, [album]);


  return { dataSet, albumImage, albumLoading, album };
};
