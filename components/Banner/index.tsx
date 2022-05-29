// REACT
import React, { useEffect, useRef, Children, cloneElement } from 'react';

// INTERFACE
interface Props {
    children: React.ReactNode;
    duration?: number;
    height?: number;
    width?: number;
    className?: string;
    style?: React.CSSProperties;
}

// STYLES
import styles from './Banner.module.scss';

const Banner: React.FC<Props> = ({ children, duration, height, width, className, style }) => {
    const banner = useRef<null | HTMLDivElement>(null);
    const track = useRef<null | HTMLDivElement>(null);
    const animation = useRef<null | Animation>(null);
    const childCount = Children.count(children);

    useEffect(() => {
        if (!banner.current) return;
        banner.current.style.setProperty('--banner-duration', `${duration}s`);
        banner.current.style.setProperty('--sponsor-height', `${height}px`);
        banner.current.style.setProperty('--sponsor-width', `${width}px`);
    }, [duration, height, width, childCount]);

    useEffect(() => {
        animation.current = track.current!.animate(
            [{ transform: 'translateX(0)' }, { transform: `translateX(-${width! * childCount}px)` }],
            {
                duration: duration! * 1000,
                iterations: Infinity
            }
        );
    }, [childCount, duration, width]);

    const handleMouseOver: (event: React.MouseEvent) => void = event => {
        event.preventDefault();
        if (!animation.current) return;
        animation.current.pause();
    };

    const handleMouseLeave: (event: React.MouseEvent) => void = event => {
        event.preventDefault();
        if (!animation.current) return;
        animation.current.play();
    };

    return (
        <div
            className={`${className} ${styles.banner}`}
            style={{ ...style }}
            ref={banner}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={styles.track}
                data-sponsor-height={height}
                data-sponsor-width={width}
                style={{ width: width! * childCount * 2 }}
                ref={track}
            >
                {children}
                {children}
            </div>
        </div>
    );
};

Banner.defaultProps = {
    className: '',
    duration: 10,
    height: 200,
    width: 300
};

export default Banner;
