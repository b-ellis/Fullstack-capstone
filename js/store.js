import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

// import { loginReducer } from './pages/login/reducers/index';
import { searchReducer } from './pages/search/reducers/index';
import { artistReducer } from './pages/artists/reducers/index';

const combinedReducer = combineReducers({
	// loginReducer: loginReducer,
	form: formReducer,
	searchReducer: searchReducer,
	artistReducer: artistReducer
});

const middleware = applyMiddleware(thunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combinedReducer, composeEnhancers(middleware));

module.exports = store;