import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, H2, AuthFormError } from '../../components';
import { setUser } from '../../actions';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { useResetForm } from '../../hooks';
import styled from 'styled-components';
import { request } from '../../utils/request';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Fill in the login')
		.matches(/\w+$/, 'Invalid login, only letters and numbers are allowed.')
		.min(3, 'Invalid login. Minimum 3 characters')
		.max(15, 'Invalid login. Maximum 15 characters'),
	password: yup
		.string()
		.required('Fill in the password')
		.matches(
			/^[\w#%]+$/,
			'Incorrect password. Letters, numbers and # % signs are allowed.',
		)
		.min(6, 'Incorrect password has been filled in. Minimum 6 characters')
		.max(30, 'Incorrect password has been filled in. Maximum 30 characters'),
});

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/api/login','POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Server error: ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Authorization</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Login..."
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Password..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<div className="button-wrapper">
					<Button type="submit" disabled={!!formError}>
						Authorize
					</Button>
					{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
					<Link to="/register">
						<Button to="/register">Registration</Button>
					</Link>
				</div>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 800px;
	margin-top: 200px;

	.button-wrapper {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}

	& > form input:nth-of-type(2) {
		margin-bottom: 20px;
	}
`;
