import type { PayloadAction } from '@reduxjs/toolkit';

import type { PokemonDetails, Pokemons } from './pokemon-types';

import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import type { RootState } from '../../store';

import { getPokemonDetails, getPokemons } from './pokemon-api';

type InitialState = {
  pokemonslist: Pokemons | null;
  pokemonDetails: PokemonDetails | null;
}

const initialState: InitialState = {
  pokemonslist: null,
  pokemonDetails: null
};

export const pokemonSlice = createSlice({
  name: 'pokemonslist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: PayloadAction<RootState, any>) => {
      state = action.payload.pokemonslist;
      return state;
    });

    builder.addMatcher(
      getPokemons.matchFulfilled,
      (state, action) => {
        state.pokemonslist = action.payload;
      },
    );

    builder.addMatcher(
      getPokemonDetails.matchFulfilled,
      (state, action) => {
        state.pokemonDetails = action.payload;
      },
    );
  },
});

export const selectPokemons = (state: RootState) => state.pokemonslist;
