import { useEffect, useState } from 'react';
import { Button, Input } from '../../../../components';
import styled from 'styled-components';

const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

const ModalContent = styled.div`
	background: #fff;
	width: 700px;
	padding: 30px 40px;
	border-radius: 10px;
	min-width: 400px;
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

const ModalTitle = styled.h3`
	margin: 0 0 10px 0;
`;

const ErrorText = styled.div`
	color: #b00;
	font-size: 16px;
`;

const initialNewProduct = {
	productName: '',
	image_url: '',
	price: '',
	category: '',
	quantity: '',
};

const AddProductModalContainer = ({
	className,
	open,
	onClose,
	onAdd,
	error,
	setError,
}) => {
	const [newProduct, setNewProduct] = useState(initialNewProduct);

	useEffect(() => {
		if (!open) setNewProduct(initialNewProduct);
	}, [open]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewProduct((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			!newProduct.productName ||
			!newProduct.image_url ||
			!newProduct.price ||
			!newProduct.category ||
			!newProduct.quantity
		) {
			setError('Заполните все поля');
			return;
		}
		setError('');
		await onAdd(newProduct);
		setNewProduct(initialNewProduct);
	};

	if (!open) return null;

	return (
		<ModalOverlay>
			<ModalContent>
				<ModalTitle>Add new product</ModalTitle>
				<form onSubmit={handleSubmit}>
					<Input
						name="productName"
						placeholder="Name..."
						value={newProduct.productName}
						onChange={handleChange}
					/>
					<Input
						name="image_url"
						placeholder="Image url..."
						value={newProduct.image_url}
						onChange={handleChange}
					/>
					<Input
						name="price"
						placeholder="Price..."
						value={newProduct.price}
						onChange={handleChange}
					/>
					<Input
						name="category"
						placeholder="Category..."
						value={newProduct.category}
						onChange={handleChange}
					/>
					<Input
						name="quantity"
						placeholder="Quantity..."
						value={newProduct.quantity}
						onChange={handleChange}
					/>
					{error && <ErrorText>{error}</ErrorText>}
					<div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
						<Button type="submit">Add</Button>
						<Button type="button" onClick={onClose}>
							Cancel
						</Button>
					</div>
				</form>
			</ModalContent>
		</ModalOverlay>
	);
};

export const AddProductModal = styled(AddProductModalContainer)``;
