import { React, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import{ createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa} from '@supabase/auth-ui-shared';
  
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
const Signup = () => {
    return (
    <div>
        <div>
            <Navbar/>

        </div>
        <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google', 'facebook', 'twitter', 'github']}
        />        
        <div>
            <Footer/>
        </div>
    </div>
)};

export default Signup;