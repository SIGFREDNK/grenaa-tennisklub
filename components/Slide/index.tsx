// REACT
import Image from 'next/image';
import React from 'react';

// INTERFACES
interface Props {
    src: string;
    alt: string;
    priority?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

// STYLES
import styles from './Slide.module.scss';

const Slide: React.FC<Props> = ({ src, alt, priority, className, style }) => {
    return (
        <div className={`${className} ${styles.slide}`} style={{ ...style }}>
            <div className={styles.wrapper}>
                <Image src={src} layout="fill" alt={alt} priority={priority} />
            </div>
        </div>
    );
};

Slide.defaultProps = {
    className: '',
    priority: false
};

export default Slide;
