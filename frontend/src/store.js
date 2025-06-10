import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import {
	userReducer,
	usersReducer,
	appReducer,
	productsReducer,
	productReducer,
	cartReducer,
	loaderReducer,
} from './reducers';

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	users: usersReducer,
	products: productsReducer,
	product: productReducer,
	cart: cartReducer,
	loader: loaderReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// ВОССТАНОВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ
const savedUser = sessionStorage.getItem('userData');
const initialState = savedUser ? { user: JSON.parse(savedUser) } : undefined;

export const store = createStore(
	reducer,
	initialState,
	composeEnhancers(applyMiddleware(thunk)),
);
