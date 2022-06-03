import type { Pokemons } from '../../src/features/pokemon';

import { useState } from 'react';
import Head from 'next/head';

import { wrapper } from '../../src/store';
import { getPokemons } from '../../src/features/pokemon';
import { usePokemons } from '../../src/hooks';
import { getUrlParams } from '../../src/utils';
import { Card } from '../../src/components/card';

import styles from '../../styles/Home.module.css';

type PokemonsProps = {
  initialPokemons: Pokemons,
}

export default function Pokemons({ initialPokemons }: PokemonsProps) {
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const { data, isFetching } = usePokemons(initialPokemons, { limit, offset });

  const { results: pokemons, count, next, previous } = data;

  function goToPage(url: string | null) {
    if (!url) return;

    const { offset: o } = getUrlParams(url);

    setOffset(Number(o));
  }

  function getPokemonNumber(index: number) {
    return offset + index + 1;
  }

  return (
    <div className={styles.home}>
      <Head>
        <title>Pokemons</title>
        <meta name="description" content="A pokedex tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Pokemon</h1>

      <div className={styles.list}>
        { pokemons.map(({ name }, index) => (
          <Card
            key={getPokemonNumber(index)}
            name={name}
            number={getPokemonNumber(index)}
            onClick={() => console.log('go to detail')}
          />
        ))}
      </div>

      <div className={styles.navigation}>
        { isFetching ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <>
            <button className={styles.button} disabled={!previous} onClick={() => goToPage(previous)}>← Previous</button>

            <div className={styles.navigationText}>{ offset + 1 } - { offset + pokemons.length } of { count }</div>

            <button className={styles.button} disabled={!next} onClick={() => goToPage(next)}>Next →</button>
          </>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async () => {
      const { data } = await store.dispatch(getPokemons.initiate({}));

      return {
        props: {
          initialPokemons: data,
        },
      };
    },
);
