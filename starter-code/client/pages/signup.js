import React from 'react';
import styles from '../styles/Signup.module.css'
import Link from "next/link";

function Signup(){
    return(
        <div>
            <form className={styles.form}>
                <div>
                    <h1 className={styles.heading}>Welcome to RateMyPotty</h1>
                    <div>
                        <label className={styles.label} htmlFor="email">Email</label>
                        <input className={styles.input} type="text" id="email" name="email"></input>
                    </div>
                    <div>
                        <label className={styles.label} htmlFor="password">Password</label>
                        <input className={styles.input} type="password" id="password" name="password"></input>
                    </div>
                    <div>
                        <Link href="/">
                            <button className={styles.signupButton} type="button">Sign Up</button>
                        </Link>
                    </div>
                </div>
            </form>
            
        </div>
    );
}

export default Signup;