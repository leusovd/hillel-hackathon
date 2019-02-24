import React from 'react';
import Comment from './Comment';
import CreateComment from './CreateComment';

class Article extends React.Component {
	constructor(props) {
		super(props);
		this.data = props.data;
		this.comments = props.comments;

		this.state = {
			comments: [...this.getComments()],
			replies: [...this.getReplies()]
		}
	}

	getComments() {
		return this.comments.filter(el => {
			return !el.parent;
		})
	}
	getReplies() {
		return this.comments.filter(el => {
			return el.parent;
		})
	}

	addComment() {
		return (
			<CreateComment
				currentUser={this.props.currentUser}
				commentsMaxId={this.props.comments.length}
				articleId={this.data.id}
				onAddComment={comment => this.props.onAddComment(comment)}
			/>
		);
	}

	renderComments() {
		const filteredComments = this.props.comments.filter(el => {
			return el.parent === '' && el.articleId === this.props.activeArticle.id;
		});
		return filteredComments.map(el => {
			const user = this.props.users.find(user => {
				return user.id === el.userId;
			});
			
			return (
				<div key={el.id} className="comment-wrapper">
					<Comment							
						data={el}
						user={user}
					/>
				</div>
			);		
		});
	}	

	render() {
		const img = require(`${this.data.image}`);

		return (
			<article className="main article">
				<img className="article__image" src={img} alt="article"/>
				<section className="article__content">
					<h1 className="article__title">{this.data.title}</h1>
					<p className="article__text">{this.data.content}</p>
				</section>
				<section className="article__comments comments">
					<h2 className="comments__title">Comments</h2>
					{this.props.currentUser ? this.addComment() : null}
					{this.renderComments()}
				</section>
			</article>			
		);
	}
}

export default Article;