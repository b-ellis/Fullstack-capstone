require('babel-polyfill');
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

class App extends React.Component{
	render(){
		return(
			<h1>Capstone</h1>
		)
	}
}

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>, 
		document.getElementById('app'));
});
