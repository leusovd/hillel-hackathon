import React from 'react';

class Menu extends React.Component {

	render() {
		return (
			<div className="menu__item">
				<button className="menu__btn">About</button>
				<button className="menu__btn">SignUp</button>
				<button
					className="menu__btn"
					onClick={() => this.props.onOpenLoginPage()}
				>Login</button>
			</div>
		);
	}
}

export default Menu;