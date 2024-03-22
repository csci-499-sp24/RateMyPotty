import React from 'react';
import styles from '../styles/Signup.module.css'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {useState} from 'react';
import{ createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa} from '@supabase/auth-ui-shared'
  
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
const Signup = () => (
    <div>
        <div>
            <Navbar/>
        </div>
        
        <Auth
            className={styles.authUI}
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google', 'facebook', 'twitter']}
        />
        
        <div>
            <Footer/>
        </div>
    </div>
)

/*function Signup(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function signUpClicked(){
        try{
            const { data, error } = await supabase.auth.signUp({
                email,
                password
            });
            if(!error){
                return <Link href='/'></Link>;
            }
        }catch(error){
            console.log(error.message);
        }
    }

    return(
        <div>
            <div>
            <Navbar></Navbar>
            </div>
            <div className={styles.formDiv}>
                <form onSubmit={signUpClicked} className={styles.form}>
                    <div>
                        <h1 className={styles.heading}>Welcome to RateMyPotty</h1>
                        <div>
                            <label className={styles.label} htmlFor="email">Email</label>
                            <input className={styles.input} type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div>
                            <label className={styles.label} htmlFor="password">Password</label>
                            <input className={styles.input} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                        <div>
                            <button className={styles.signupButton} type="submit">Sign Up</button>
                        </div>
                    </div>
                </form>
                <div>
                    <Footer></Footer>
                </div>
            </div>
            
        </div>
    );
}*/

export default Signup;