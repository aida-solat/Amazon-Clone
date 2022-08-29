import { Provider } from 'react-redux';
import { store } from '../app/store';
import '../styles/globals.css';
import '../styles/menu.css';
import { SessionProvider } from 'next-auth/react';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;
