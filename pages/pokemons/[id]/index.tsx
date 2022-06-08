import React from 'react'
import Head from 'next/head';
import Image from 'next/image'
import { useRouter } from 'next/router';

import { wrapper } from '../../../src/store';
import { getPokemonDetails, PokemonDetails } from '../../../src/features/pokemon';
import { usePokemonDetails } from '../../../src/hooks/usePokemonDetails';
import { BUG, DARK, DRAGON, ELECTRIC, FAIRY, FIGHTING, FIRE, FLYING, GHOST, GRASS, GROUND, ICE, NORMAL, POISON, PSYCHIC, ROCK, SHADOW, STEEL, UNKNOWN, WATER } from '../../../src/utils';
import { StatCard } from '../../../src/components/statCard';
import { DetailsCard } from '../../../src/components/detailsCard';
import { Section } from '../../../src/components/section';
import styles from '../../../styles/Pokemons.module.css';

type PokemonDetailsProps = {
    initialPokemonDetails: PokemonDetails,
}

/**
 * Get background color
 * @returns  color code
 */
const getBackgroundColor = (type: string | null = ''): string => {
    switch (type) {
        case 'normal':
            return NORMAL
            break;

        case 'fighting':
            return FIGHTING
            break;

        case 'flying':
            return FLYING
            break;

        case 'poison':
            return POISON
            break;

        case 'ground':
            return GROUND
            break;

        case 'rock':
            return ROCK
            break;

        case 'bug':
            return BUG
            break;

        case 'ghost':
            return GHOST
            break;

        case 'steel':
            return STEEL
            break;

        case 'fire':
            return FIRE
            break;

        case 'water':
            return WATER
            break;

        case 'grass':
            return GRASS
            break;

        case 'electric':
            return ELECTRIC
            break;

        case 'psychic':
            return PSYCHIC
            break;

        case 'ice':
            return ICE
            break;

        case 'dragon':
            return DRAGON
            break;

        case 'dark':
            return DARK
            break;

        case 'fairy':
            return FAIRY
            break;

        case 'shadow':
            return SHADOW
            break;

        default:
            return UNKNOWN
            break;
    }
}

export default function PokemonDetail({ initialPokemonDetails }: PokemonDetailsProps) {
    const router = useRouter();
    const { id } = router.query;
    const { data, isFetching } = usePokemonDetails(initialPokemonDetails, { id });
    const typeName = data?.types[0]?.type.name;
    const abilities = data?.abilities?.map(({ ability }) => ability?.name).join(', ');
    const moves = data?.moves?.map(({ move }) => move?.name).join(', ');

    return (
        <div >
            <Head>
                <title>{data?.name}</title>
                <meta name="description" content="A pokedex tool" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <style global jsx>{`
        body {
            background: ${getBackgroundColor(typeName)};
        }
      `}</style>

            {!isFetching && <div className={styles.container}>
                <div className={styles.btnSection}>
                    <button className={styles.btn} onClick={() => router.push(`/pokemons`)}>← back to overview</button>
                </div>
                <div className={styles.detailSection}>
                    <div className={styles.image}>
                        <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} layout="fixed" width="96" height="96" />
                    </div>
                    <div className={styles.primaryDetails}>
                        <DetailsCard text={Number(id).toString().padStart(3, '0')} />
                        <DetailsCard text={data?.name} type='title' />
                        <DetailsCard text={data?.types?.map(ele => ele?.type?.name).join('-')} />
                    </div>
                </div>
                <div className={styles.stats}>
                    {data?.stats?.map(({ base_stat, stat }) => <StatCard base_stat={base_stat} stat={stat} />)}
                </div>
                <Section title='abitilities' skills={abilities} />
                <Section title='moves' skills={moves} />
            </div>}
        </div >
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async () => {
            const { data } = await store.dispatch(getPokemonDetails.initiate({}));

            return {
                props: {
                    initialPokemonDetails: data || null,
                },
            };
        },
);
