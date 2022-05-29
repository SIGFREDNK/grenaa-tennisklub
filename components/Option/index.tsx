// REACT
import React from 'react';

// INTERFACES
interface Props {
    text: string;
    value: string;
    className?: string;
    style?: React.CSSProperties;
}

// STYLES
import styles from './Option.module.scss';

const Option: React.FC<Props> = ({ text, value, className, style }) => {
    return (
        <option value={value} className={`${className} ${styles.option}`} style={{ ...style }}>
            {text}
        </option>
    );
};

Option.defaultProps = {
    className: ''
};

export default Option;
