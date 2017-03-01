require('babel-polyfill');
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import store from './store';

import Login from './pages/login/components/App';
import Application from './pages/application/components/app';
import Search from './pages/search/components/Game';
import Leaderboard from './pages/leaderboard/components/index.js';
import Profile from './pages/profile/components/index.js';

const routes = (
	<Router history={browserHistory}>
		<Route path='/' component={Login} />
		<Route path='search' component={Application}>
			<IndexRoute component={Search} />
			<Route path='/profile' component={Profile}/>
		</Route>
	</Router>
)

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Provider store={store}>
			{routes}
		</Provider>, 
		document.getElementById('app'));
});
