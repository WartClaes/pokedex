import Image from 'next/image';

import styles from './card.module.css';

type CardProps = {
  name: string,
  number: number,
  onClick: (pokemonNumber: number) => void,
};

export function Card({ name, number, onClick }: CardProps) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
  const paddedNumber = number.toString().padStart(3, '0');

  return (
    <div className={styles.card} onClick={() => onClick(number)}>
      <span>#{ paddedNumber }</span>
      <Image src={imageUrl} layout="fixed" width="96" height="96" />
      <span>{ name }</span>
    </div>
  );
}
