// NEXT
import Image from 'next/image';

// REACT
import React, { useEffect, useRef, useState } from 'react';

// INTERFACE
interface Props {
    src: string;
    alt: string;
    href: string;
    className?: string;
    style?: React.CSSProperties;
}

// STYLES
import styles from './Sponsor.module.scss';

const Sponsor: React.FC<Props> = ({ src, alt, href, className, style }) => {
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(200);

    const sponsor = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        if (!sponsor.current) return;
        const newWidth = sponsor.current.parentElement?.parentElement?.getAttribute('data-sponsor-width');
        const newHeight = sponsor.current.parentElement?.parentElement?.getAttribute('data-sponsor-height');
        if (newWidth) setWidth(parseInt(newWidth));
        if (newHeight) setHeight(parseInt(newHeight));
    }, []);

    return (
        <a href={href}>
            <div className={`${className} ${styles.sponsor}`} style={{ ...style }} ref={sponsor}>
                <Image src={src} height={height} width={width} alt={alt} />
            </div>
        </a>
    );
};

Sponsor.defaultProps = {
    className: ''
};

export default Sponsor;
