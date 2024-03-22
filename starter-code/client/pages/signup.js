import React from 'react';
import styles from '../styles/Signup.module.css'
import Navbar from '../components/Navbar';


function Signup(){
    return(
        <div>
            <div>
            <Navbar></Navbar>
            </div>
            <div className={styles.formDiv}>
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
                            <button className={styles.signupButton} type="button">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
            
        </div>
    );
}

export default Signup;