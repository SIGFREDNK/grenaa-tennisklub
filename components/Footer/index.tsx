// REACT
import React from 'react';

// INTERFACE
interface Props {
    className?: string;
    style?: React.CSSProperties;
}

// STYLES
import styles from './Footer.module.scss';

const Footer: React.FC<Props> = ({ className, style }) => {
    return (
        <footer className={`${className} ${styles.footer}`} style={{ ...style }}>
            <p>© Alle rettigheder tilhører Grenaa Tennisklub</p>
            <small>Powered by Virketrang</small>
        </footer>
    );
};

Footer.defaultProps = {
    className: ''
};

export default Footer;
