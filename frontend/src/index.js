import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/Home.css";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import reportWebVitals from "./reportWebVitals";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
