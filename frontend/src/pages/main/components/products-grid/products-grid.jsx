import styled from 'styled-components';

const ProductCard = styled.div`
	width: 260px;
	background: #fff;
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	transition: box-shadow 0.2s;
	&:hover {
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
	}
`;

const ProductName = styled.h3`
	margin: 0 0 10px 0;
	font-size: 20px;
`;

export const ProductsGridContainer = ({ className, products, onCardClick }) => (
	<div className={className}>
		{products.length === 0 && (
			<div className="cart_empty">Products not found</div>
		)}
		{products.map((product) => (
			<ProductCard
				key={product.id}
				onClick={() => onCardClick(product.id)}
				title={product.productName}
			>
				<img src={product.image_url} alt={product.productName} />
				<ProductName>{product.productName}</ProductName>
				<div>Price: {product.price}</div>
				<div>Quantity: {product.quantity}</div>
			</ProductCard>
		))}
	</div>
);

export const ProductsGrid = styled(ProductsGridContainer)`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 40px;
	padding: 40px;

	& img {
		width: 160px;
		height: 160px;
		object-fit: contain;
		margin-bottom: 15px;
	}
`;
