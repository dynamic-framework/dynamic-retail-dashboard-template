import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { DContextProvider } from '@dynamic-framework/ui-react';

import './config/liquidConfig';
import './config/i18nConfig';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';

import '@dynamic-framework/ui-react/dist/css/dynamic-ui.css';
import './styles/base.scss';
import ModalActivate from './components/modals/ModalActivate';

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
      </DContextProvider>
    </Provider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
