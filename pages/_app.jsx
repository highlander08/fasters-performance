import '../styles/globals.css';
import { MyContextProvider } from '../hooks/useContext';
function MyApp({ Component, pageProps }) {
  return (
    <MyContextProvider>
      <Component {...pageProps} />
    </MyContextProvider>
  );
}

export default MyApp;
