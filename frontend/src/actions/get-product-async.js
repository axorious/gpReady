import { setProducts } from './set-products';
import { setLoading } from './set-loading';

export const fetchProducts = () => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await fetch('/api/products', {
			method: 'GET',
		});
		const products = await response.json();
		dispatch(setProducts(products));
	} finally {
		dispatch(setLoading(false));
	}
};
