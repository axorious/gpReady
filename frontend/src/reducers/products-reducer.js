const initialProductsState = [];

export const productsReducer = (state = initialProductsState, action) => {
	switch (action.type) {
		case 'ADD_PRODUCT':
			return [...state, action.payload];
		case 'SET_PRODUCTS':
			return action.payload;
		case 'DELETE_PRODUCT':
			return state.filter((product) => product.id !== action.payload);
		case 'UPDATE_PRODUCT':
			return state.map((product) =>
				product.id === action.payload.id ? action.payload : product,
			);
		default:
			return state;
	}
};
