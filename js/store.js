import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducer } from './reducers/index';

const middleware = applyMiddleware(thunk);

const store = createStore(reducer, compose(middleware));

module.exports = store;