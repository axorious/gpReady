import { Input, Button } from '../../../../components';
import styled from 'styled-components';

const StyledTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	th,
	td {
		width: 200px;
		border: 1px solid #ccc;
		justify-items: center;
		padding: 8px;
	}
`;

const ButtonWrapper = styled.div`
	display: flex;
	gap: 10px;
	justify-content: center;
`;

const ProductTableContainer = ({
	products,
	editId,
	editData,
	handleEdit,
	handleChange,
	handleSave,
	handleCancel,
	handleDelete,
}) => (
	<StyledTable>
		<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Image</th>
				<th>Price</th>
				<th>Category</th>
				<th>Quantity</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{products.map((product) =>
				editId === product.id ? (
					<tr key={product.id}>
						<td>{product.id}</td>
						<td>
							<Input
								name="productName"
								value={editData.productName}
								onChange={handleChange}
							/>
						</td>
						<td>
							<Input
								name="image_url"
								value={editData.image_url}
								onChange={handleChange}
							/>
						</td>
						<td>
							<Input
								name="price"
								value={editData.price}
								onChange={handleChange}
							/>
						</td>
						<td>
							<Input
								name="category"
								value={editData.category || ''}
								onChange={handleChange}
							/>
						</td>
						<td>
							<Input
								name="quantity"
								value={editData.quantity || ''}
								onChange={handleChange}
							/>
						</td>
						<td>
							<ButtonWrapper>
								<Button width="60px" onClick={handleSave}>
									Save
								</Button>
								<Button width="60px" onClick={handleCancel}>
									Cancel
								</Button>
							</ButtonWrapper>
						</td>
					</tr>
				) : (
					<tr key={product.id}>
						<td>{product.id}</td>
						<td>{product.productName}</td>
						<td>
							<img src={product.image_url} alt="image_url" width={60} />
						</td>
						<td>{product.price}</td>
						<td>{product.category || ''}</td>
						<td>{product.quantity || ''}</td>
						<td>
							<ButtonWrapper>
								<Button width="60px" onClick={() => handleEdit(product)}>
									Edit
								</Button>
								<Button
									width="60px"
									onClick={() => handleDelete(product.id)}
									background="#fcadad"
								>
									Delete
								</Button>
							</ButtonWrapper>
						</td>
					</tr>
				),
			)}
		</tbody>
	</StyledTable>
);

export const ProductTable = styled(ProductTableContainer)``;
