// REACT
import React, { useEffect, useRef } from 'react';

// INTERFACES
interface Props {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    open?: boolean;
    title?: string;
    onClose?: () => any;
}

// ICONS
import { CgClose } from 'react-icons/cg';

// STYLES
import styles from './Modal.module.scss';

const Modal: React.FC<Props> = ({ children, className, style, open, title, onClose }) => {
    const modal = useRef<null | HTMLElement>(null);

    useEffect(() => {
        if (!modal.current) return;
        console.log();
        // @ts-ignore
        if (open && !modal.current.open) modal.current.showModal();

        // @ts-ignore
        if (!open && modal.current.open) modal.current.close();
    }, [open]);

    const handleClick = () => {
        if (!modal.current) return;
        if (onClose) onClose();
    };

    return (
        <dialog className={`${className} ${styles.modal}`} style={{ ...style }} modal-mode="mega" ref={modal}>
            <div className={styles.header}>
                <h4 className={styles.title}>{title}</h4>
                <button className={styles.close} onClick={handleClick}>
                    <CgClose />
                </button>
            </div>
            <div className={styles.body}>{children}</div>
        </dialog>
    );
};

Modal.defaultProps = {
    className: '',
    open: false,
    onClose: () => null
};

export default Modal;
