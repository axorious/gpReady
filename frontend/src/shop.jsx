import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Header, Footer } from './components';
import { selectLoader } from './selectors';
import { Loader } from './components';
import {
	Authorization,
	Registration,
	AdminPanel,
	ProductCard,
	Main,
	Cart,
} from './pages';
import styled from 'styled-components';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1440px;
	min-height: 100%;
	padding: 0 73px;
	margin: 0 auto;
	background-color: #f5f5f5;
`;

export const Shop = () => {
	const isLoading = useSelector(selectLoader);

	return (
		<AppColumn>
			{isLoading && <Loader />}
			<Header />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/login" element={<Authorization />} />
				<Route path="/register" element={<Registration />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/admin" element={<AdminPanel />} />
				<Route path="/product/:productId" element={<ProductCard />} />
				<Route path="*" element={<div>Oops, something went wrong.</div>} />
			</Routes>
			<Footer />
		</AppColumn>
	);
};
