import { updateProduct } from './update-product';
import { setLoading } from './set-loading';

export const updateProductAsync = (id, data) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await fetch(`/api/products/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});
		if (!response.ok) throw new Error('Server error');
		const updated = await response.json();
		dispatch(updateProduct(updated));
	} catch (e) {
		alert('Ошибка при сохранении товара: ' + e.message);
	} finally {
		dispatch(setLoading(false));
	}
};
