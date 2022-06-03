import type { Action, ThunkAction } from '@reduxjs/toolkit';

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createWrapper } from 'next-redux-wrapper';

import { pokemonApi, pokemonSlice } from './features/pokemon';

export function makeStore() {
  const store = configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,

      [pokemonSlice.name]: pokemonSlice.reducer,
    },

    devTools: process.env.NODE_ENV !== 'production',

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        pokemonApi.middleware,
      ),
  });

  setupListeners(store.dispatch);

  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<AppStore>(makeStore);

