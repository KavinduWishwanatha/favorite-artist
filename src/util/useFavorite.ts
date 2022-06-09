import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { favouriteCreateAction } from '../redux/actions';
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
    const newFavourite = { image: albumImage || DEFAULT_ALBUM_IMAGE, name: data.name, duration: data.duration, artist: data.artist };
    const exist = favouriteList.find((e: ITrack) => e.name === newFavourite.name);

    if (exist) {
      dispatch(favouriteCreateAction(favouriteList.filter((e: ITrack) => e.name !== newFavourite.name)));
    } else {
      dispatch(favouriteCreateAction([...favouriteList, newFavourite]));
    }
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
