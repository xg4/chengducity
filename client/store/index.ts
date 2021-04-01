import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { housesReducer } from './slices';

export * from './slices';

const rootReducer = combineReducers({
  houses: housesReducer,
});

export type CoreState = ReturnType<typeof rootReducer>;

export default configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});
