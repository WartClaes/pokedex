export type PokemonItem = {
  name: string,
  url: string,
}

export type Pokemons = {
  count: number,
  results: PokemonItem[],
  next: string | null,
  previous: string | null,
};

