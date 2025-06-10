import { ACTION_TYPE } from './action-type';
import { setLoading } from './set-loading';

export const deleteProductAsync = (id) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await fetch(`/api/products/${id}`, {
			method: 'DELETE',
		});
		if (!response.ok) throw new Error('Server error');
		dispatch({
			type: ACTION_TYPE.DELETE_PRODUCT,
			payload: id,
		});
	} catch (e) {
		alert('Ошибка при удалении товара: ' + e.message);
	} finally {
		dispatch(setLoading(false));
	}
};
