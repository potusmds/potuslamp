import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.css';

const load = document.getElementById('load');

ReactDOM.render(<App id={load.dataset.id}/>, document.getElementById('app'));