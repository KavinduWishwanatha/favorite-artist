import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '.';

export type AppThunk = ThunkAction<void, RootState, null, AnyAction>;
