// _app.tsx

import { AppProps } from 'next/app';
import { AppContextProvider } from '../components/AppContext';
import '../styles/globals.css'; // Adjust relative path based on your project structure

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export default MyApp;
