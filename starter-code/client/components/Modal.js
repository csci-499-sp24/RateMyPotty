import React, { useEffect } from 'react';
import modStyles from './Modal.module.css'; 

const Modal = ({ isOpen, onClose, children, selectedName, selectedAddress }) => {
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
            <div className={modStyles.modalOverlay} onClick={onClose}></div>
            <div className={modStyles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={modStyles.closeButton} onClick={onClose} aria-label="Close">&times;</button>
                <div className={modStyles.modalBody}>
                    <h2 className={modStyles.modalTitle}>{selectedName || 'No Name'}</h2>
                    <div className={modStyles.modalBodyContent}>{selectedAddress}</div>
                </div>
                <div className={modStyles.modalFooter}>
                    <button className={modStyles.closeButton} onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;