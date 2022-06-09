import { combineReducers } from 'redux';
import favourite from './modules/favourite/reducer';

const rootReducer = combineReducers({
  favourite,
});

export default (state: any, action: any) => rootReducer(state, action);

export type RootState = ReturnType<typeof rootReducer>;
