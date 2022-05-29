// REACT
import React from 'react';

// INTERFACES
interface Props {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

// STYLES
import styles from './Navigation.module.scss';

const Navigation: React.FC<Props> = ({ children, className, style }) => {
    return (
        <nav className={`${className} ${styles.navigation}`} style={{ ...style }}>
            <ul>{children}</ul>
        </nav>
    );
};

Navigation.defaultProps = {
    className: ''
};

export default Navigation;
