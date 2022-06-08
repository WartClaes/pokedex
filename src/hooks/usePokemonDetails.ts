import type { PokemonDetails } from '../features/pokemon';

import { useGetPokemonDetailsQuery } from '../features/pokemon';

export function usePokemonDetails(initialValue: PokemonDetails, params: any = {}) {
  const { data, ...props } = useGetPokemonDetailsQuery(params);

  return {
    data: data || initialValue,
    ...props,
  }
}
