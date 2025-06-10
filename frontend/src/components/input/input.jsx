import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width};
	height: 40px;
	padding: 10px;
	margin: ${({ margin = '0 0 10px' }) => margin};
	border: 1px solid #000;
	border-radius: 20px;
	font-size: 18px;
`;
