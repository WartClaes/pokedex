import styles from './statCard.module.css';

type StatCardProps = {
    base_stat: number,
    stat: { name: string }
}

export function StatCard({ base_stat, stat: { name } }: StatCardProps) {

    const statName = name === 'special-attack' ? 'sp. atk' : name === 'special-defense' ? 'sp.def' : name;

    return (
        <div className={styles.card}>
            <span className={styles.statName}>{statName}</span>
            <span className={styles.statValue}>{base_stat}</span>
        </div>
    );
}