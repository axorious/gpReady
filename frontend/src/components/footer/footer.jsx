import styled from 'styled-components';
import { Logo } from '../logo/logo';

const FooterContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className="upper-footer">
				<div className="upper-footer__logo">
					<div>
						<Logo />
						<p>
							Sign up for texts to be notified about
							<br /> our best offers on the perfect gifts.
						</p>
					</div>
				</div>
				<div>
					<h3>All product</h3>
					<ul>
						<li>Phones</li>
						<li>Watch</li>
						<li>Laptop</li>
						<li>Tablet</li>
					</ul>
				</div>
				<div>
					<h3>All Company</h3>
					<ul>
						<li>About</li>
						<li>Support</li>
					</ul>
				</div>
			</div>
			<div className="bottom-footer">
				<div className="bottom-footer_made-by">
					<p className="bottom-footer_p">Made By:</p>
					<a href="https://t.me/axorious">Axorious</a>
				</div>
				<div className="bottom-footer_made-by">
					<p className="bottom-footer_p">Powered By:</p>
					<a href="https://result.school/">Result School</a>
				</div>
			</div>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	flex-direction: column;
	height: 378px;
	gap: 120px;

	& .upper-footer {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	& h3 {
		margin: 0 0 20px 0;
	}

	& li {
		font-size: 17px;
		margin-bottom: 13px;
	}

	& .bottom-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid #ccc;
	}

	& .bottom-footer_made-by {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	& .bottom-footer_p {
		font-weight: 700;
	}
`;
