import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Pokemons } from './pokemon-types';

type GetPokemonsParams = {
  limit?: number,
  offset?: number,
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
  }),
});

export const {
  useGetPokemonsQuery,

  endpoints: {
    getPokemons,
  }
} = pokemonApi;
