import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ContentProvider from './context/ContentProvider'

ReactDOM.render(
    <React.StrictMode>
	<ContentProvider>
        <App />
	</ContentProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
