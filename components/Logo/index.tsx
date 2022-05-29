// REACT
import React from 'react';

// NEXT
import Link from 'next/link';

// INTERFACES
interface Props {
    href: string;
    text: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

// STYLES
import styles from './Logo.module.scss';

const Logo: React.FC<Props> = ({ href, text, className, style }) => {
    return (
        <Link href={href}>
            <a className={`${className} ${styles.logo}`} style={{ ...style }}>
                {text}
            </a>
        </Link>
    );
};

Logo.defaultProps = {
    className: ''
};

export default Logo;
