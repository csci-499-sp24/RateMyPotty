import React from 'react';
import styles from '../styles/Signup.module.css'

function Signup(){
    return(
        <div>
            <form className={styles.form}>
                <div>
                    <h2 className={styles.heading}>Welcome to RateMyPotty</h2>
                    <div>
                        <label className={styles.label} htmlFor="email">Email</label>
                        <input className={styles.input} type="text" id="email" name="email"></input>
                    </div>
                    <div>
                        <label className={styles.label} htmlFor="password">Password</label>
                        <input className={styles.input} type="password" id="password" name="password"></input>
                    </div>
                    <div>
                        <button className={styles.signupButton} type="button">Sign Up</button>
                    </div>
                </div>
            </form>
            
        </div>
    );
}

export default Signup;