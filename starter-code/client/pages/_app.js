import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import {
  APIProvider
} from "@vis.gl/react-google-maps";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Component {...pageProps} />
      </APIProvider>
    </ThemeProvider>
  );
}

export default MyApp;

