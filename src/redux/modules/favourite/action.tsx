import { ITrack } from '../../../@types';
import { AppThunk } from '../../types';
import { FavouriteAction } from './reducer';
import { FavouriteTypes } from './types';

export const favouriteCreateAction = (list: ITrack[]): FavouriteAction => ({
  type: FavouriteTypes.MANAGE_FAVOURITE,
  list,
});

export const addFavourite =
  (newFavourite: ITrack): AppThunk =>
  (dispatch, getState) => {
    const { favourite: { list } } = getState();
    const exist = list.find((e: ITrack) => e.name === newFavourite.name);

    if (exist) {
      dispatch(favouriteCreateAction(list.filter((e: ITrack) => e.name !== newFavourite.name)));
    } else {
      dispatch(favouriteCreateAction([...list, newFavourite]));
    }
  };