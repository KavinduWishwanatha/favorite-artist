import { useEffect, useState } from 'react';

import { addFavourite } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import type { RootState } from '../redux/reducer';
import type { ITrack } from '../@types';
import { DEFAULT_ALBUM_IMAGE } from '../constant';

interface Props {
  tracks: ITrack[];
  albumImage?: string;
}

export const useFavorites = ({ tracks, albumImage }: Props) => {
  const favouriteList = useSelector((state: RootState) => state.favourite.list);
  const [trackList, setTrackList] = useState<ITrack[]>([]);
  const dispatch = useDispatch();

  const addTrackAsFavourite = (data: ITrack) => {
    dispatch(addFavourite({ image: albumImage || DEFAULT_ALBUM_IMAGE, name: data.name, duration: data.duration }));
  };

  useEffect(() => {
    const newTracks = tracks.map((track) => {
      return {
        ...track,
        isFav: Boolean(favouriteList.find((e) => e.name === track.name)),
      };
    });
    setTrackList(newTracks);
  }, [tracks, favouriteList, setTrackList]);


  return { trackList, addTrackAsFavourite };
};
