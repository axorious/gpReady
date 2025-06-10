import styled from 'styled-components';
import { Input } from '../../../../components';

const PanelContainer = ({ className, sortBy, onChange }) => (
	<div className={className}>
		<label>
			<Input
				type="radio"
				name="sort"
				width="70px"
				checked={sortBy === 'price'}
				onChange={() => onChange('price')}
			/>
			By<br></br> value
		</label>
		<label>
			<Input
				type="radio"
				name="sort"
				width="70px"
				checked={sortBy === 'productName'}
				onChange={() => onChange('productName')}
			/>
			By<br></br> name
		</label>
		<label>
			<Input
				type="radio"
				name="sort"
				width="70px"
				checked={sortBy === 'quantity'}
				onChange={() => onChange('quantity')}
			/>
			By<br></br> quantity
		</label>
	</div>
);

export const Panel = styled(PanelContainer)`
	display: flex;
	gap: 10px;
	margin: 30px 0 0 10px;
`;
