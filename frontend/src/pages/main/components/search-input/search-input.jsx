import { useState, useEffect } from 'react';
import { Input } from '../../../../components';
import styled from 'styled-components';

const SearchInputContainer = ({
	value,
	onChange,
	className,
	delay = 400,
	placeholder = 'Search...',
}) => {
	const [localValue, setLocalValue] = useState(value);

	useEffect(() => {
		setLocalValue(value);
	}, [value]);

	useEffect(() => {
		const handler = setTimeout(() => {
			onChange(localValue);
		}, delay);
		return () => clearTimeout(handler);
	}, [localValue, onChange, delay]);

	return (
		<div className={className}>
			<Input
				type="text"
				value={localValue}
				onChange={(e) => setLocalValue(e.target.value)}
				placeholder={placeholder}
			/>
		</div>
	);
};

export const SearchInput = styled(SearchInputContainer)`
	width: 100%;
`;
