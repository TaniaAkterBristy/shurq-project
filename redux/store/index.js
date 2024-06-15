import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createFilter from 'redux-persist-transform-filter';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authSlice from '../slices/auth-slice';
import storeSlice from '../slices/store-slice';
import dashboardSlice from '../slices/dashboard-slice';
const storesTransform = createFilter('dashboard', ['allCards']);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'store', 'dashboard'],
  transforms: [storesTransform]
};
const reducers = combineReducers({
  auth: authSlice,
  store: storeSlice,
  dashboard: dashboardSlice
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/LogOut') {
    state = undefined;
  }
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
  devTools: true
});

export default store;