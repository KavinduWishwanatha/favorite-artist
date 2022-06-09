import { ITrack } from '../../../@types';
import { FavouriteAction } from './reducer';
import { FavouriteTypes } from './types';

export const favouriteCreateAction = (list: ITrack[]): FavouriteAction => ({
  type: FavouriteTypes.MANAGE_FAVOURITE,
  list,
});

export const favouriteSetArtistAction = (artist: string): FavouriteAction => ({
  type: FavouriteTypes.SET_ARTIST,
  artist,
});