import { IFavourites } from './action';
import { FavouriteTypes } from './types';

interface SetFavourites {
  type: FavouriteTypes.MANAGE_FAVOURITE;
  list: IFavourites[];
}

export type FavouriteAction = SetFavourites;

interface InitialStateI {
  list: IFavourites[];
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
