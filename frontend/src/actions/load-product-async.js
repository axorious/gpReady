import { setProductData } from './set-product-data';
import { setLoading } from './set-loading';

export const loadProductAsync = (id) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await fetch(`/api/products/${id}`, {
			method: 'GET',
		});
		if (!response.ok) throw new Error('Server error');
		const product = await response.json();
		dispatch(setProductData(product));
	} catch (e) {
		alert('Ошибка при загрузке товара: ' + e.message);
	} finally {
		dispatch(setLoading(false));
	}
};
