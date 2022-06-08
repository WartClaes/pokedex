import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { PokemonDetails, Pokemons } from './pokemon-types';

type GetPokemonsParams = {
  limit?: number,
  offset?: number,
};

type getPokemonDetailsParams = {
  id?: string,
};

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),

  endpoints: (builder) => ({
    getPokemons: builder.query<Pokemons, GetPokemonsParams>({
      query: ({ limit = 20, offset }) => ({
        url: 'pokemon',
        params: {
          limit,
          offset,
        },
      }),
    }),
    getPokemonDetails: builder.query<PokemonDetails, getPokemonDetailsParams>({
      query: builder => ({
        url: `pokemon/${builder.id}`
      })
    })
  }),
});

export const {
  useGetPokemonsQuery,
  useGetPokemonDetailsQuery,

  endpoints: {
    getPokemons,
    getPokemonDetails,
  }
} = pokemonApi;
