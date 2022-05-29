// REACT
import React from 'react';

// INTERFACE
interface Props {
    name: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
    style?: React.CSSProperties;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
}

// STYLES
import styles from './Input.module.scss';

const Input: React.FC<Props> = ({ name, label, type, placeholder, required, className, style, value, onChange }) => {
    return (
        <div className={`${className} ${styles.wrapper}`} style={{ ...style }}>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

Input.defaultProps = {
    className: '',
    type: 'text',
    placeholder: '',
    required: false
};

export default Input;
