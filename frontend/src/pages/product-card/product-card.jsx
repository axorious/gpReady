import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadProductAsync, addToCart } from '../../actions';
import { selectProduct } from '../../selectors';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { Button, Tooltip } from '../../components';
import styled from 'styled-components';

const ProductCardContainer = ({ className }) => {
	const { productId } = useParams();
	const dispatch = useDispatch();
	const product = useSelector(selectProduct);
	const roleId = useSelector(selectUserRole);

	useEffect(() => {
		dispatch(loadProductAsync(productId));
	}, [dispatch, productId]);

	if (!product) {
		return <div className={className}>Oops, something went wrong.</div>;
	}

	const isGuest = roleId !== ROLE.ADMIN && roleId !== ROLE.BUYER;

	const handleAddToCart = () => {
		dispatch(addToCart(product));
	};

	return (
		<div className={className}>
			<img src={product.image_url} alt={product.productName} width={300} />
			<div className="product_details">
				<h3>{product.productName}</h3>
				<p>Quantity: {product.quantity}</p>
				<p>Price: {product.price}</p>
			</div>
			<div className="product-tooltip_wrapper">
				<Tooltip text="Registered users only" disabled={isGuest}>
					<Button width="200px" onClick={handleAddToCart} disabled={isGuest}>
						Add to cart
					</Button>
				</Tooltip>
			</div>
			<div className="product_id">ID: {product.id}</div>
		</div>
	);
};

export const ProductCard = styled(ProductCardContainer)`
	max-width: 1294px;
	min-height: 400px;
	padding: 100px 70px;
	display: flex;
	align-items: center;
	position: relative;

	.product_details h3 {
		margin: 0;
	}

	& .product_details {
		margin-left: 70px;
		display: flex;
		flex-direction: column;
		gap: 100px;
		font-size: 20px;
	}

	& .product_id {
		position: absolute;
		right: 24px;
		bottom: 16px;
		font-size: 13px;
		color: #888;
	}

	& .product-tooltip_wrapper {
		margin-left: 400px;
	}
`;
