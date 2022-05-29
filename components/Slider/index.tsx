// REACT
import React, { Children, useState, useRef, useEffect } from 'react';

// INTERFACES
interface Props {
    children: React.ReactNode;
    interval?: number;
    className?: string;
    style?: React.CSSProperties;
}

// STYLES
import styles from './Slider.module.scss';

const Slider: React.FC<Props> = ({ children, interval, className, style }) => {
    const [index, setIndex] = useState<number>(0);
    const slider = useRef<null | HTMLDivElement>(null);

    const childCount = Children.count(children);

    useEffect(() => {
        const myInterval = setInterval(() => {
            setIndex(prevIndex => (prevIndex === childCount - 1 ? 0 : prevIndex + 1));
        }, interval! * 1000);

        return () => clearInterval(myInterval);
    }, [childCount, interval]); // eslint-disable-line

    useEffect(() => {
        if (!slider.current) return;
        slider.current.scrollTo({
            left: slider.current.offsetWidth * index,
            behavior: 'smooth'
        });
    }, [index]);

    return (
        <div className={`${className} ${styles.slider}`} style={{ ...style }} ref={slider}>
            <div className={styles.wrapper} style={{ width: `${100 * childCount}%` }}>
                {children}
            </div>
        </div>
    );
};

Slider.defaultProps = {
    className: '',
    interval: 1
};

export default Slider;
