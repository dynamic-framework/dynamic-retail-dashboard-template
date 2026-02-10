import { DContextProvider, DToastContainer } from '@dynamic-framework/ui-react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './config/liquidConfig';
import './config/i18nConfig';

import App from './App';
import ModalActivate from './components/modals/ModalActivate';
import store from './store/store';

// import '@dynamic-framework/ui-react/dist/css/dynamic-ui.css';
import './styles/base.scss';

const root = ReactDOM.createRoot(document.getElementById('dashboard') as Element);
root.render(
  <StrictMode>
    <Provider store={store}>
      <DContextProvider
        availablePortals={{
          modalActivate: ModalActivate,
        }}
      >
        <App />
        <DToastContainer position="top-right" />
      </DContextProvider>
    </Provider>
  </StrictMode>,
);
