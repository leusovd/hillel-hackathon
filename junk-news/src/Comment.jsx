import React from 'react';

class Comment extends React.Component {	
	render() {
		const commentOrReply = this.props.data.parent ? ' post--reply' : '';
		const img = require(`${this.props.user.avatar}`);

		return (
			<article className={`comments__post post${commentOrReply}`}>
				<div className="post__wrapper">
					<div className="post__avatar">
						<img src={img} alt="avatar"/>
					</div>
					<h3 className="post__title">{this.props.data.title}</h3>
				</div>
				<p className="post__text">{this.props.data.content}</p>
			</article>
		);
	}
}

export default Comment;