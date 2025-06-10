import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, H2, AuthFormError } from '../../components';
import { useResetForm } from '../../hooks';
import { setUser } from '../../actions';
import { ROLE } from '../../constants';
import { selectUserRole } from '../../selectors';
import styled from 'styled-components';
import { request } from '../../utils/request';

const regFormSchema = yup.object().shape({
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
	passcheck: yup
		.string()
		.required('Fill in the password again')
		.oneOf([yup.ref('password'), null], 'Password repeat does not match'),
});

const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/api/register', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Server error: ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	if (roleId === ROLE.BUYER) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Registration</H2>
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
				<Input
					type="password"
					placeholder="Password verification..."
					{...register('passcheck', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Sign up
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 800px;
	margin-top: 200px;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}

	& > form input:nth-of-type(3) {
		margin-bottom: 20px;
	}
`;
