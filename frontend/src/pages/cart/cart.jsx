import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, changeCartCount } from '../../actions';
import { Input } from '../../components';
import { selectCart } from '../../selectors';
import { Button } from '../../components';
import styled from 'styled-components';

const CartSummary = styled.div`
	flex: 1;
	background: #fff;
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	padding: 32px 24px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 24px;
	min-width: 280px;
`;

const Total = styled.div`
	font-size: 22px;
	font-weight: 700;
	margin-bottom: 20px;
`;

const CartContainer = ({ className }) => {
	const cart = useSelector(selectCart);
	const dispatch = useDispatch();

	const total = cart.reduce(
		(sum, item) => sum + Number(item.price.replace(/\D/g, '')) * item.count,
		0,
	);

	const handleCountChange = (id, value) => {
		const count = Math.max(1, Number(value));
		dispatch(changeCartCount(id, count));
	};

	return (
		<div className={className}>
			<div className="cart_list">
				{cart.length === 0 && (
					<div className="cart_empty">Shopping cart is empty</div>
				)}
				{cart.map((item) => (
					<div className="cart_item" key={item.id}>
						<img src={item.image_url} alt={item.productName} />
						<div className="cart-item_info">
							<h3>{item.productName}</h3>
							<p>Price: {item.price}</p>
							<div className="cart-item_quantity">
								Quantity:
								<Input
									type="number"
									min="1"
									margin="0"
									width="80px"
									value={item.count}
									onChange={(e) =>
										handleCountChange(item.id, e.target.value)
									}
								/>
							</div>
							<div>
								Amount:{' '}
								{Number(item.price.replace(/\D/g, '')) * item.count} $
							</div>
						</div>
						<Button
							width="80px"
							background="#fcadad"
							onClick={() => dispatch(removeFromCart(item.id))}
						>
							Delete
						</Button>
					</div>
				))}
			</div>
			<CartSummary>
				<Total>Total: {total} $</Total>
				<Button width="180px" disabled={cart.length === 0}>
					Place an order
				</Button>
			</CartSummary>
		</div>
	);
};

export const Cart = styled(CartContainer)`
	display: flex;
	gap: 40px;
	align-items: center;
	margin: 40px 0;

	.cart_empty {
		flex: 1;
		text-align: center;
		font-size: 24px;
		color: #888;
	}

	.cart_list {
		flex: 2;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.cart_item {
		display: flex;
		align-items: center;
		background: #fff;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
		padding: 24px;
		gap: 30px;
	}

	& img {
		width: 100px;
		height: 100px;
		object-fit: contain;
		border-radius: 8px;
		background: #f5f5f5;
	}

	.cart-item_info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	& p {
		font-size: 18px;
		margin: 0;
	}

	.cart-item_quantity {
		display: flex;
		align-items: center;
		gap: 10px;
	}
`;
