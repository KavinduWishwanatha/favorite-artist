import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import event from './modules/favourite/reducer';

const persistConfig = {
  key: 'root',
  storage,
};


const reducers = combineReducers({
  event,
})

export type RootState = ReturnType<typeof reducers>;

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

export const persistor = persistStore(store);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
