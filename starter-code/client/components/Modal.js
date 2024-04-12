import React, { useEffect } from 'react';
import styles from './Modal.module.css'; // Import your CSS module for styling

const Modal = ({ isOpen, onClose, children, selectedName }) => {
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div>
            <div className={styles.modalOverlay} onClick={onClose}></div>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Close">&times;</button>
                <div className={styles.modalBody}>
                    <h2 className={styles.modalTitle}>{selectedName || 'No Name'}</h2>
                    <div className={styles.modalBodyContent}>{children}</div> 
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.closeButton} onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;