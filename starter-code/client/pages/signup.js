import { React, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/router'; // import useRouter remove this

require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Signup = () => {
  const router = useRouter(); // initialize router

  // was not being redirected when signed in so 
  useEffect(() => {
    const unsubscribe = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          router.push('/');
        }
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      {/* Add padding around login form and also set max width so it doesnt take up 100% width of bigger screens */}
      <div style={{ padding: '16px', maxWidth: '700px', margin: '0 auto' }}>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'facebook', 'twitter', 'github']}
        />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Signup;