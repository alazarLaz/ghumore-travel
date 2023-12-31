import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { Provider } from "react-redux";
import store from './redux/store';
// import SecurePayConfirm from './Pages/SecurePayConfirm';
import SecurePay from './Pages/SecurePay';
import SecureCheckout from './Pages/SecureCheckout';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<Provider store={store}>
      <App />
      {/* <SecurePayConfirm/> */}
      {/* <SecurePay/> */}
      {/* <SecureCheckout /> */}
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
