import React from 'react';

class Categories extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpened: false
		}

		this.categories = [
			'all',
			'cars',
			'lights',
			'mountains',
			'nature',
			'people'
		];
	}

	openCategoryList() {
		this.setState({isOpened: !this.state.isOpened});
	}
	chooseCategory(category) {
		this.props.onChooseCategory(category);
		this.setState({
			isOpened: false
		});

	}

	render() {
		const categories = this.categories.map((el, i) => {
			return (
				<li
					key={i}
					onClick={() => this.chooseCategory(el)}
				>{el}</li>
			);
		});
		const categoryBtn = this.props.category ? this.props.category : 'Category';
		const isOpened = this.state.isOpened ? 'active' : '';

		return (
			<div className="menu__item category-menu">
				<button
					className="menu__btn"
					onClick={() => this.openCategoryList()}
				>{categoryBtn}</button>
				<ul className={`category-menu__list ${isOpened}`}>
					{categories}
				</ul>
			</div>
		);
	}
}

export default Categories;