// REACT
import Link from 'next/link';
import React from 'react';

// INTERFACES
interface DefaultProps {
    text: string;
    type?: 'LOCAL' | 'WEB' | 'BUTTON';
    backgroundColor?: string;
    color?: string;
    className?: string;
    style?: React.CSSProperties;
}

type TypeProps =
    | { type?: 'BUTTON'; href?: never; onClick: () => any }
    | { type?: 'WEB' | 'LOCAL'; href: string; onClick?: never };

type Props = DefaultProps & TypeProps;

// STYLES
import styles from './Button.module.scss';

const Button: React.FC<Props> = ({ text, type, backgroundColor, color, href, onClick, className, style }) => {
    if (type === 'WEB')
        return (
            <a
                className={`${className} ${styles.button}`}
                style={{ ...style, backgroundColor, color }}
                href={href}
                onMouseDown={event => (event.currentTarget.style.transform = 'scale(0.85)')}
                onMouseUp={event => (event.currentTarget.style.transform = 'scale(1)')}
                onMouseOver={event => (event.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={event => (event.currentTarget.style.transform = 'scale(1)')}
            >
                {text}
            </a>
        );
    else if (type === 'LOCAL')
        return (
            <Link href={href}>
                <a
                    className={`${className} ${styles.button}`}
                    style={{ ...style, backgroundColor, color }}
                    onMouseDown={event => (event.currentTarget.style.transform = 'scale(0.85)')}
                    onMouseUp={event => (event.currentTarget.style.transform = 'scale(1)')}
                    onMouseOver={event => (event.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={event => (event.currentTarget.style.transform = 'scale(1)')}
                >
                    {text}
                </a>
            </Link>
        );
    else
        return (
            <button
                className={`${className} ${styles.button}`}
                style={{ ...style, backgroundColor, color }}
                onClick={onClick}
                onMouseDown={event => (event.currentTarget.style.transform = 'scale(0.85)')}
                onMouseUp={event => (event.currentTarget.style.transform = 'scale(1)')}
                onMouseOver={event => (event.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={event => (event.currentTarget.style.transform = 'scale(1)')}
            >
                {text}
            </button>
        );
};

Button.defaultProps = {
    className: '',
    backgroundColor: '#000000',
    color: '#ffffff',
    type: 'BUTTON'
};

export default Button;
