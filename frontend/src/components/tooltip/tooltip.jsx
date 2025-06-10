import styled from 'styled-components';

const TooltipWrapper = styled.span`
	position: relative;
	display: inline-block;
`;

const TooltipText = styled.span`
	visibility: hidden;
	width: 160px;
	background-color: #222;
	color: #fff;
	text-align: center;
	padding: 8px 0;
	border-radius: 6px;
	position: absolute;
	z-index: 1;
	bottom: 110%;
	left: 50%;
	transform: translateX(-50%);
	opacity: 0;
	transition: opacity 0.2s;
	pointer-events: none;

	${TooltipWrapper}:hover & {
		visibility: visible;
		opacity: 1;
	}
`;

export const Tooltip = ({ children, text, disabled }) => (
	<TooltipWrapper>
		{children}
		{disabled && <TooltipText>{text}</TooltipText>}
	</TooltipWrapper>
);
