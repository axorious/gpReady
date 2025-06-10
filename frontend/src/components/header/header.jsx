import styled from 'styled-components';
import { ControlPanel } from './components';
import { Logo } from '../../components';

const Discription = styled.div`
	font-size: 24px;
	font-weight: 400;
	line-height: 40px;
`;

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		<Discription>
			The new are here
			<br /> take a look.
		</Discription>
		<ControlPanel />
	</header>
);

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 1294px;
	height: 120px;
	padding: 20px 40px;
`;
