import React from 'react';
import styles from './Button.module.css';

const STYLES = [ 
    'btnPrimary',
    'btnOutline'
]

const SIZES = [
    'btnMedium',
    'btnLarge'
]

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    return (
        <button className={`${styles.btn} ${styles[checkButtonStyle]} ${styles[checkButtonSize]}`} onClick={onClick} type={type}>
            {children}
        </button>
    )
};