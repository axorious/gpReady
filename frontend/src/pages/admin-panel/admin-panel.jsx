import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ROLE } from '../../constants';
import { selectProducts, selectUserRole } from '../../selectors';
import { useAdminPanel } from '../../hooks';
import { AddProductModal, ProductTable } from './components';
import { Button, H2 } from '../../components';
import {
	addProductAsync,
	fetchProducts,
	deleteProductAsync,
	updateProductAsync,
} from '../../actions';
import styled from 'styled-components';

const AdminPanelContainer = ({ className }) => {
	const roleId = useSelector(selectUserRole);
	const products = useSelector(selectProducts);
	const [modalOpen, setModalOpen] = useState(false);
	const [addError, setAddError] = useState('');
	const {
		editId,
		editData,
		handleEdit,
		handleChange,
		handleCancel,
		handleDelete,
		setEditId,
	} = useAdminPanel();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	if (roleId !== ROLE.ADMIN) {
		return <Navigate to="/" />;
	}

	const handleAddProduct = async (newProduct) => {
		await dispatch(addProductAsync(newProduct));
		setModalOpen(false);
	};

	const handleSave = async () => {
		await dispatch(updateProductAsync(editId, editData));
		setEditId(null);
	};

	const handleDeleteProduct = (id) => dispatch(deleteProductAsync(id));

	return (
		<div className={className}>
			<div className="admin-panel__wrapper">
				<H2 margin="0">Admin panel: Edit products</H2>
				<Button width="220px" onClick={() => setModalOpen(true)}>
					Add new product
				</Button>
			</div>
			<ProductTable
				products={products}
				editId={editId}
				editData={editData}
				handleEdit={handleEdit}
				handleChange={handleChange}
				handleSave={handleSave}
				handleCancel={handleCancel}
				handleDelete={(id) => handleDelete(id, handleDeleteProduct)}
			/>
			<AddProductModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				onAdd={handleAddProduct}
				error={addError}
				setError={setAddError}
			/>
		</div>
	);
};
export const AdminPanel = styled(AdminPanelContainer)`
	padding: 60px 40px;

	& .button-row {
		display: flex;
		gap: 10px;
		justify-content: center;
		width: 100%;
	}

	& .admin-panel__wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
	}
`;
