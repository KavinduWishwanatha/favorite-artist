import { ITrack } from '../../../@types';
import { DEFAULT_ARTIST } from '../../../constant';
import { FavouriteTypes } from './types';

interface SetFavourites {
  type: FavouriteTypes.MANAGE_FAVOURITE;
  list: ITrack[];
}

interface SetArtist {
  type: FavouriteTypes.SET_ARTIST;
  artist: string;
}

export type FavouriteAction = SetFavourites | SetArtist;

interface InitialStateI {
  list: ITrack[];
  artist: string;
}

const initialState: InitialStateI = {
  list: [],
  artist: DEFAULT_ARTIST
};

export default function reducer(
  state: InitialStateI = initialState,
  action: FavouriteAction
): InitialStateI {
  switch (action.type) {
    case FavouriteTypes.MANAGE_FAVOURITE:
      return {
        ...state,
        list: action.list,
      };
    case FavouriteTypes.SET_ARTIST:
      return {
        ...state,
        artist: action.artist,
      };
    default:
      return state;
  }
}
