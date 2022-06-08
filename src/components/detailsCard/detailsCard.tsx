import styles from './detailsCard.module.css';
import cn from 'classnames';

type DetailsCardProps = {
    text: string;
    type?: string | '';
}

export const DetailsCard = ({ text, type = '' }: DetailsCardProps) => {
    return (
        <div className={cn({
            [styles.title]: type === 'title',
            [styles.detail]: type === ''
        })}>
            {text}
        </div>
    )
}
