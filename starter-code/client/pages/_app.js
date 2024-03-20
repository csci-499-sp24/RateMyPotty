import { useState } from 'react';
import HomePage from '@/components/HomePage';
//import './App.css'
import './index.css'
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
//everything added form temp
import SectionTitle from "../components/sectionTitle";
import Benefits from "../components/benefits";
import Testimonials from "../components/testimonials";
import Cta from "../components/cta";
import Faq from "../components/faq";
import PopupWidget from "../components/popupWidget";


const theme = {
  colors: {
    primary: '#0070f3',
  },
};

function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <HomePage {...pageProps} />
    </ThemeProvider>
  );
}

export default App;