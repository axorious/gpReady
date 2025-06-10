import { ACTION_TYPE } from '../actions';

const initialProductState = null;

export const productReducer = (state = initialProductState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PRODUCT:
			return action.payload;
		default:
			return state;
	}
};
