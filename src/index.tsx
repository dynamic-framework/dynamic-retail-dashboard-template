import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { LiquidContextProvider } from '@dynamic-framework/ui-react';

import '@dynamic-framework/ui-react/dist/css/dynamic-ui-react.css';

import './config/liquidConfig';
import './config/i18nConfig';
import './styles/styles.scss';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('dashboard') as Element);
root.render(
  <StrictMode>
    <LiquidContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </LiquidContextProvider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
