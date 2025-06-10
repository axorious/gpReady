import styled from 'styled-components';

const ButtonContainer = ({ children, className, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	font-family: 'Readex Pro', sans-serif;
	width: ${({ width = '100%' }) => width};
	background-color: ${({ background = '#c2ccc9', disabled }) =>
		disabled ? '#c2ccc9' : background};
	height: 40px;
	padding: 0;
	border-radius: 5px;
	border: none;
	color: ${({ disabled }) => (disabled ? '#888' : '#000')};
	opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

	&:hover {
		background-color: ${({ disabled }) => (disabled ? 'none' : '#b0b8b5')};
		cursor: pointer;
	}
`;
