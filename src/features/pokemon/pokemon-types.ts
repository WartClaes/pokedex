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

export type PokemonType = {
  type: { name: string | null }
}

export type AbilityType = {
  ability: { name: string }
}

export type MoveType = {
  move: { name: string }
}

export type StatType = {
  base_stat: number,
  stat: { name: string }
}

export type PokemonDetails = {
  id: number,
  abilities: AbilityType[],
  name: string,
  stats: StatType[],
  types: PokemonType[],
  moves: MoveType[]
}

