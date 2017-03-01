require('babel-polyfill');
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import store from './store';

import Login from './pages/login/components/App';
import Application from './pages/application/components/app';
import Game from './pages/game/components/Game';
import Leaderboard from './pages/leaderboard/components/index.js';
import Profile from './pages/profile/components/index.js';

const routes = (
	<Router history={browserHistory}>
		<Route path='/' component={Login} />
		<Route path='pickems' component={Application}>
			<IndexRoute component={Game} />
			<Route path='/leaderboard' component={Leaderboard} />
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
