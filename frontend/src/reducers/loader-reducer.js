import { ACTION_TYPE } from '../actions';

const initialLoaderState = false;

export const loaderReducer = (state = initialLoaderState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_LOADING:
			return action.payload;
		default:
			return state;
	}
};
