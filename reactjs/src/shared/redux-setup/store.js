import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers';
import { createStore } from 'redux';

const persistConfig = {
  key: 'redux-store',
  storage: storage,
  keyPrefix: 'vietpro:',
};

const store = createStore(persistReducer(persistConfig,reducers));
persistStore(store);

export default store;
