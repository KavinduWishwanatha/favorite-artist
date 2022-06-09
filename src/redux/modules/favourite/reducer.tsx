import { ITrack } from '../../../@types';
import { FavouriteTypes } from './types';

interface SetFavourites {
  type: FavouriteTypes.MANAGE_FAVOURITE;
  list: ITrack[];
}

export type FavouriteAction = SetFavourites;

interface InitialStateI {
  list: ITrack[];
}

const initialState: InitialStateI = {
  list: [],
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
    default:
      return state;
  }
}
