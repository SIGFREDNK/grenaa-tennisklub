// REACT
import React from 'react';

// NEXT
import Link from 'next/link';

// INTERFACES
interface Props {
    href: string;
    text: string;
    className?: string;
    style?: React.CSSProperties;
}

// STYLES
import styles from './NavItem.module.scss';

const NavItem: React.FC<Props> = ({ href, text, className, style }) => {
    return (
        <li className={`${className} ${styles.navitem}`} style={{ ...style }}>
            <Link href={href}>
                <a>{text}</a>
            </Link>
        </li>
    );
};

NavItem.defaultProps = {
    className: ''
};

export default NavItem;
