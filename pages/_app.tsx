// _app.tsx

import { AppProps } from 'next/app';
import { AppContextProvider } from '../components/AppContext';
import '../styles/global.css';



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export default MyApp;
