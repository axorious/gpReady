import { ACTION_TYPE } from './action-type';
import { setLoading } from './set-loading';

export const addProductAsync = (product) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await fetch('/api/products', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(product),
		});
		if (!response.ok) throw new Error('Server error');
		const created = await response.json();
		dispatch({
			type: ACTION_TYPE.ADD_PRODUCT,
			payload: created,
		});
	} catch (e) {
		alert('Ошибка при добавлении товара: ' + e.message);
	} finally {
		dispatch(setLoading(false));
	}
};
