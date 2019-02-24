import React from 'react';
import Categories from './Categories';
import Menu from './Menu';
import User from './User';

class Header extends React.Component {

	renderNavigation() {
		return !this.props.currentUser ?
			<Menu
				onOpenLoginPage={() => { this.props.onOpenLoginPage()}}
			/> :
			<User
				data={this.props.currentUser}
				onCreateArticle={() => this.props.onOpenCreateArticle()}
				onUserLogout={() => this.props.onLogout()}
			/>;
	}

	renderCategoriesBtn() {
		if (!this.props.activeArticle) {
			return (
				<div className="menu__item">
					<Categories
						category={this.props.category}
						onChooseCategory={category => this.props.onChooseCategory(category)}
					/>
				</div>
			);				
		}
	}
	
	render() {
		return (
			<header className="header">
				<a className="logo logo--header link" href="#" aria-label="logo"></a>
				<div className="header__menu menu">
					{this.renderCategoriesBtn()}
					{this.renderNavigation()}					
				</div>
			</header>
			
		);
	}
}

export default Header;