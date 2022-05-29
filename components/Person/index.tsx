// REACT
import Image from 'next/image';
import React from 'react';

// INTERFACES
interface Props {
    src: string;
    name: string;
    position: string;
    phone: string;
    mail: string;
    street: string;
    city: string;
    className?: string;
    style?: React.CSSProperties;
}

// STYLES
import styles from './Person.module.scss';

const Person: React.FC<Props> = ({ src, name, phone, position, mail, street, city, className, style }) => {
    return (
        <div className={`${className} ${styles.person}`} style={{ ...style }}>
            <div className={styles.wrapper}>
                <Image src={src} layout="fill" alt={name} />
            </div>
            <div className={styles.bio}>
                <h4>{name}</h4>
                <p>{position}</p>
                <a href={`tel:${phone}`}>{phone}</a>
                <a href={`mailto:${mail}`}>{mail}</a>
                <p>{street}</p>
                <p>{city}</p>
            </div>
        </div>
    );
};

Person.defaultProps = {
    className: ''
};

export default Person;
