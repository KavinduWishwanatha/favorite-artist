import { AnyAction, CombinedState, combineReducers } from 'redux';
import favourite from './modules/favourite/reducer';

const rootReducer = combineReducers({
  favourite,
});

export type RootState = ReturnType<typeof rootReducer>;
const reducer = (state: RootState, action: AnyAction): CombinedState<RootState> =>
  rootReducer(state, action);
export default reducer;