import { useState } from 'react';

export const useAdminPanel = () => {
	const [editId, setEditId] = useState(null);
	const [editData, setEditData] = useState({});

	const handleEdit = (product) => {
		setEditId(product.id);
		setEditData(product);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditData((prev) => ({ ...prev, [name]: value }));
	};

	const handleCancel = () => {
		setEditId(null);
		setEditData({});
	};

	const handleDelete = (id, onDelete) => {
		if (window.confirm('Удалить этот товар?')) {
			onDelete(id);
		}
	};

	return {
		editId,
		editData,
		handleEdit,
		handleChange,
		handleCancel,
		handleDelete,
		setEditId,
	};
};
