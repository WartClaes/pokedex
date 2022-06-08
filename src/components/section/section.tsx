import styles from './section.module.css';

type SectionProps = {
    title: string;
    skills: string;
}

export const Section = ({ title, skills }: SectionProps) => {
    return (
        <div className={styles.section}>
            <div className={styles.label}>{title}</div>
            <div className={styles.skills}>
                {skills}
            </div>
        </div>
    )
}
