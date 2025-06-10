import { ACTION_TYPE } from './action-type';

export const addToCart = (product) => ({
	type: ACTION_TYPE.ADD_TO_CART,
	payload: product,
});

export const removeFromCart = (id) => ({
	type: ACTION_TYPE.REMOVE_FROM_CART,
	payload: id,
});

export const changeCartCount = (id, count) => ({
	type: ACTION_TYPE.CHANGE_CART_COUNT,
	payload: { id, count },
});
