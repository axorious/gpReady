import { ACTION_TYPE } from '../actions';

const initialCartState = [];

export const cartReducer = (state = initialCartState, action) => {
	switch (action.type) {
		case ACTION_TYPE.ADD_TO_CART: {
			const item = state.find((i) => i.id === action.payload.id);
			if (item) {
				return state.map((i) =>
					i.id === item.id ? { ...i, count: i.count + 1 } : i,
				);
			}
			return [...state, { ...action.payload, count: 1 }];
		}
		case ACTION_TYPE.REMOVE_FROM_CART:
			return state.filter((i) => i.id !== action.payload);
		case ACTION_TYPE.CHANGE_CART_COUNT:
			return state.map((i) =>
				i.id === action.payload.id ? { ...i, count: action.payload.count } : i,
			);
		case ACTION_TYPE.LOGOUT:
			return initialCartState;
		default:
			return state;
	}
};
