import React from 'react';

class Login extends React.Component {

	render() {
		return (
			<div
				className="login-form"
				onClick={(event) => this.props.onCloseLoginPage(event)}
			>
				<form className="login-form__wrapper">
					<label className="login-form__label">Email:</label>
					<input className="login-form__field login-form__name" name="login" type="email"/>
					<label className="login-form__label">Password:</label>
					<input className="login-form__field login-form__password" name="password" type="password"/>
					<div className="login-form__wrapper login-form__wrapper--buttons">
						<input class="login-form__button login-form__button--sign-in" type="submit" value="Sign in"></input>
						<input class="login-form__button login-form__button--sign-up" type="submit" value="Register"></input>
					</div>
				</form>
			</div>			
		);
	}
}

export default Login;