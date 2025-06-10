import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../actions';
import { selectProducts } from '../../selectors';
import { Panel, ProductsGrid, SearchInput } from './components';
import styled from 'styled-components';

export const MainContainer = ({ className }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const products = useSelector(selectProducts);
	const [sortBy, setSortBy] = useState('');
	const [search, setSearch] = useState('');

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	const filteredProducts = useMemo(() => {
		const searchLower = search.trim().toLowerCase();
		if (!searchLower) return products;
		return products.filter(
			(p) =>
				p.productName.toLowerCase().includes(searchLower) ||
				(p.category && p.category.toLowerCase().includes(searchLower)),
		);
	}, [products, search]);

	const sortedProducts = useMemo(() => {
		const arr = [...filteredProducts];
		if (sortBy === 'price') {
			return arr.sort(
				(a, b) =>
					Number(b.price.replace(/\D/g, '')) -
					Number(a.price.replace(/\D/g, '')),
			);
		}
		if (sortBy === 'productName') {
			return arr.sort((a, b) => a.productName.localeCompare(b.productName));
		}
		if (sortBy === 'quantity') {
			return arr.sort((a, b) => Number(b.quantity) - Number(a.quantity));
		}
		return arr;
	}, [filteredProducts, sortBy]);

	return (
		<div className={className}>
			<div className="main_header">
				<SearchInput value={search} onChange={setSearch} />
				<Panel sortBy={sortBy} onChange={setSortBy} />
			</div>
			<ProductsGrid
				products={sortedProducts}
				onCardClick={(id) => navigate(`/product/${id}`)}
			/>
		</div>
	);
};

export const Main = styled(MainContainer)`
	.main_header {
		display: flex;
		gap: 30;
		align-items: center;
		margin: 30px 0 0 0;
	}
`;
