import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import store from '../redux/store'
import "../styles/globals.css";

// import store from '../redux/store/index';

// const persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <Component {...pageProps} />
    {/* </PersistGate> */}
  </Provider>
}

export default MyApp;
