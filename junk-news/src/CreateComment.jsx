import React from 'react';

class CreateComment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
	}

	handleChange(event) {
		const value = event.target.value;
		this.setState({value: value});
	}

	addComment(event) {
		event.preventDefault();
		
		const comment = {
			id: `${this.props.commentsMaxId}`,
			date: (new Date()).toLocaleString(),
			userId: this.props.currentUser.id,
			title: `newTitle${this.props.commentsMaxId + 1}`,
			content: this.state.value,
			articleId: this.props.articleId,
			parent: ''
		}
		this.props.onAddComment(comment);
		this.setState({value: ''});
	}

	render() {
		const img = require(`${this.props.currentUser.avatar}`);
		return (
			<form	className="comments-form">
				<div className="comments-form__wrapper">
					<div className="comments-form__avatar avatar">
						<img src={img} alt="avatar" />
					</div>
					<h3 className="comments-form__title">{this.props.currentUser.name}</h3>
				</div>
				<textarea
					className="comments-form__text"
					rows="5"
					onChange={event => {this.handleChange(event)}}
					value={this.state.value}
				></textarea>
				<button
					className="comments-form__button"
					onClick={(event) => this.addComment(event)}
				>Submit</button>
      </form>
		);
	}
}

export default CreateComment;