import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
	selectUserLogin,
	selectUserRole,
	selectUserSession,
} from '../../../../selectors';
import { ROLE } from '../../../../constants';
import { Button } from '../../../../components';
import { logout } from '../../../../actions';

const UserName = styled.div`
	font-size: 21px;
	align-content: center;
	font-weight: 400;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const session = useSelector(selectUserSession);

	return (
		<div className={className}>
			<div className="control-panel_wrapper">
				{roleId === ROLE.GUEST ? (
					<Button
						className="control-panel__button"
						onClick={() => navigate('/login')}
					>
						Sign in
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<Button onClick={() => dispatch(logout(session))}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="25"
								height="25"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									stroke="#323232"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 12h-8M18 15l3-3v0s0 0 0 0v0l-3-3M16 5v-.5 0c0-.8-.7-1.5-1.5-1.5H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h9.5c.8 0 1.5-.7 1.5-1.5v0-.5"
								/>
							</svg>
						</Button>
					</>
				)}
			</div>
			<div className="control-panel__button-wrapper">
				<Button onClick={() => navigate('/cart')}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="25"
						height="25"
						viewBox="0 0 32 32"
					>
						<path d="M31.7 8.9a1 1 0 0 0-.8-.4H9.7L8.1 2.9C7.5.7 6 .5 5.4.5H1a1 1 0 1 0 0 2h4.3s.5 0 .8 1l5.5 20.3c.1.4.5.7 1 .7h13.5a1 1 0 0 0 .9-.7l4.8-14a1 1 0 0 0-.2-1zm-6.2 13.6h-12l-3.2-12h19.2zm-2 4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm-9 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
					</svg>
				</Button>
				<Button
					onClick={() => navigate('/admin')}
					disabled={roleId !== ROLE.ADMIN}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="25"
						height="25"
						viewBox="0 0 1920 1920"
					>
						<path
							fillRule="evenodd"
							d="m773.6 1069.7 711 711a102.2 102.2 0 0 0 144.2 0l138.2-138.3a101 101 0 0 0 30-72c0-27.2-10.7-52.7-30-72l-698.7-698.7 11.5-32.7a495.5 495.5 0 0 0-115.3-514A496 496 0 0 0 493 124.7L765.2 397a170.6 170.6 0 0 1 50.3 121.7 171 171 0 0 1-50.3 121.8L654.5 751.2c-67.2 67-176.4 67-243.5 0L138.7 478.9A496.3 496.3 0 0 0 267 950.5a495.3 495.3 0 0 0 476 127.3l30.6-8.1Zm783 850.3c-54 0-108.2-20.7-149.3-61.9L740 1191a604.7 604.7 0 0 1-550.5-163A606.1 606.1 0 0 1 65.8 356.2l32.4-72.7 390.2 390.2a63 63 0 0 0 88.7 0L687.8 563a62.5 62.5 0 0 0 18.2-44.4c0-16.7-6.4-32.5-18.2-44.3L297.6 84.2l72.7-32.4a606.2 606.2 0 0 1 671.6 123.7 605.6 605.6 0 0 1 151.9 594.8l650.6 650.7c40 39.8 62 93 62 149.4 0 56.4-22 109.5-62 149.4L1706.2 1858a211.2 211.2 0 0 1-149.6 61.9Z"
						/>
					</svg>
				</Button>
			</div>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	flex-direction: column;
	width: 170px;

	& .control-panel__button-wrapper {
		display: flex;
		gap: 1px;
		margin-bottom: 5px;
	}

	& .control-panel_wrapper {
		display: flex;
		gap: 30px;
		margin-bottom: 5px;
	}
`;
