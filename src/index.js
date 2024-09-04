import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NewClassForm from '../src/components/NewClassForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import 'bootstrap-datepicker';
import 'react-signature-canvas';

const currentURL = window.location.pathname;

if (currentURL === '/new-class') {
  // Render NewClassForm in the new window
  ReactDOM.render(<NewClassForm />, document.getElementById('root'));
} else {
  // Render the main app
  ReactDOM.render(<App />, document.getElementById('root'));
}
