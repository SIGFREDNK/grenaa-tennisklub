// REACT
import React, { useEffect, useRef } from 'react';

// INTERFACES
interface Props {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

// STYLES
import styles from './Header.module.scss';

const Header: React.FC<Props> = ({ children, className, style }) => {
    const header = useRef<null | HTMLElement>(null);

    useEffect(() => {
        const handleScroll: (event: Event) => void = event => {
            if (window.scrollY === 0) header.current!.classList.remove(styles.sticky);
            else header.current!.classList.add(styles.sticky);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`${className} ${styles.header}`} style={{ ...style }} ref={header}>
            {children}
        </header>
    );
};

Header.defaultProps = {
    className: ''
};

export default Header;
