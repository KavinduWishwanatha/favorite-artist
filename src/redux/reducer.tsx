import { AnyAction, CombinedState } from 'redux';
import event from './modules/favourite/reducer';

const rootReducer = event;

export type RootState = ReturnType<typeof rootReducer>;
const reducer = (state: RootState, action: AnyAction): CombinedState<RootState> =>
  rootReducer(state, action);
export default reducer;
