// REACT
import React, { ChangeEvent } from 'react';

// INTERFACES
interface Props {
    className?: string;
    style?: React.CSSProperties;
    name?: string;
    children: React.ReactNode;
    title?: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => any;
    value: string;
}

// STYLES
import styles from './Select.module.scss';

const Select: React.FC<Props> = ({ className, style, name, children, title, onChange, value }) => {
    return (
        <div className={`${className} ${styles.wrapper}`} style={{ ...style }}>
            {title && <h4 className={styles.title}>{title}</h4>}
            <select name={name} className={styles.select} onChange={onChange} value={value}>
                {children}
            </select>
        </div>
    );
};

Select.defaultProps = {
    className: '',
    name: ''
};

export default Select;
