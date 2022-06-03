import type { Pokemons } from '../features/pokemon';

import { useGetPokemonsQuery } from '../features/pokemon';

export function usePokemons(initialValue: Pokemons, params: any = {}) {
  const { data, ...props } = useGetPokemonsQuery(params);

  return {
    data: data || initialValue,
    ...props,
  }
}
