// REACT
import React from 'react';

// INTERFACE
interface Props {
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
    onSubmit?: (event: React.FormEvent) => any;
    method?: string;
    button?: string;
}

// STYLES
import styles from './Form.module.scss';

const Form: React.FC<Props> = ({ className, style, children, onSubmit, method, button }) => {
    const handleSubmit: (event: React.FormEvent) => void = event => {
        event.preventDefault();
        if (onSubmit) onSubmit(event);
    };

    return (
        <form
            className={`${className} ${styles.form}`}
            style={{ ...style }}
            onSubmit={handleSubmit}
            autoComplete="off"
            method={method}
        >
            {children}
            <button
                type="submit"
                className={styles.button}
                onMouseDown={event => (event.currentTarget.style.transform = 'scale(0.85)')}
                onMouseUp={event => (event.currentTarget.style.transform = 'scale(1)')}
                onMouseOver={event => (event.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={event => (event.currentTarget.style.transform = 'scale(1)')}
            >
                {button}
            </button>
        </form>
    );
};

Form.defaultProps = {
    className: '',
    method: 'POST',
    onSubmit: () => null,
    button: 'Send'
};

export default Form;
