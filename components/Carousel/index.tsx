// REACT
import React, { useRef } from 'react';

// TYPES
type Props = {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

// STYLES
import styles from './Carousel.module.scss';

const Carousel: React.FC<Props> = ({ children, className, style }) => {
    let currentOffset: number = 0;
    let fingerStartingXPosition: number = 0;
    let mousePressed: boolean = false;
    let moveX: number = 0;
    const startX = useRef(0);

    const start = (event: React.MouseEvent) => {
        mousePressed = true;

        startX.current = -event.currentTarget.scrollLeft;
        fingerStartingXPosition = event.clientX;

        event.currentTarget.classList.add(styles.active);
    };

    const move = (event: React.MouseEvent) => {
        if (!mousePressed) return;

        moveX = event.clientX;

        currentOffset = moveX - fingerStartingXPosition + startX.current;
        console.log(currentOffset);
        event.currentTarget.scrollLeft = -currentOffset;
    };

    const stop = (event: React.MouseEvent) => {
        mousePressed = false;

        moveX = 0;
        fingerStartingXPosition = 0;

        event.currentTarget.classList.remove(styles.active);
    };

    return (
        <div
            className={`${styles.carousel} ${className}`}
            style={style}
            onMouseDown={start}
            onMouseMove={move}
            onMouseUp={stop}
            onMouseLeave={stop}
        >
            {children}
        </div>
    );
};

export default Carousel;
