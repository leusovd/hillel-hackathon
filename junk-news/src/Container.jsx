import React from 'react';

class Container extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mainArticle: this.initMainArticle()
		}
	}	

	initMainArticle() {
		return this.props.articles.reduce((prev, cur) => {
			prev = prev.date > cur.date ? prev : cur;
			return prev;
		});
	}

	filterArticles(category) {
		return this.props.articles.filter(el => {
			if (!category || category === 'all') {
				return el;
			} else {
				return el.category === category;
			}
		});
	}
	renderMainArticle() {
		const img = require(`${this.state.mainArticle.image}`);

		return (
			<section
				className="preview"
				onClick={() => this.props.onOpenArticle(this.state.mainArticle.id)}
			>
				<img src={img} alt="article" className="preview__image"/>
				<div className="preview__content">
					<h1 className="preview__title">{this.state.mainArticle.title}</h1>
					<p className="preview__text">{this.state.mainArticle.content}</p>
				</div>
			</section>
		);
	}

	renderArticles() {		
		const articles = this.filterArticles(this.props.category);		

		const renderedArticles = articles.map(el => {
			const img = require(`${el.image}`);
			if (el !== this.props.mainArticle) {
				return (
					<div
						key={el.id}
						className="card"
						onClick={() => this.props.onOpenArticle(el.id)}
					>
						<img className="card__image" src={img} alt="article"></img>
						<div className="card__text">
							<h2>{el.title}</h2>
						</div>
						<div className="article_content">
							{el.content}
						</div>
					</div>
				);
			}
			
		});
		return (
			<div className='news-gallery'>
				{renderedArticles}
			</div>
		);			
	}

	render() {

		return (
			<main className="main">
				{this.renderMainArticle()}
				{this.renderArticles()}
			</main>
			
		);
	}
}

export default Container;