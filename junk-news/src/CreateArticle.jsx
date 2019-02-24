import React from "react";
import * as axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class CreateArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      image: "",
      content: ""
    };
	}
	
	createArticle(event) {
		event.preventDefault();
		const article = {
			id: `${this.props.nextArticleId + 1}`,
			title: this.state.title,
			date: (new Date).toLocaleString(),
			content: this.state.content,
			image: this.state.image,
			category: {id: 1}
		}
		this.props.onAddArticle(article);
		this.setState({
			title: '',
			image: '',
			content: ''
		});
		const article1 = {
			title: this.state.title,
			content: this.state.content,
			imageFilename: this.state.image,
			category: { id: 1 }
		}

		axios.post('http://37.59.228.228:8080/admin/article', JSON.stringify(article1))
			.then(function (response) {
				console.log(response.data.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

  handleTitleChange(event) {
    const value = event.target.value;
    this.setState({ title: value });
  }
  handleImageChange(event) {
    const value = event.target.value;
    this.setState({ image: value });
  }
  handleContentChange(event) {
    const value = event.target.value;
    this.setState({ content: value });
  }

  render() {
    return (
      <form className="create-article-form">
        <label
          htmlFor="art-create-title"
          className="create-article-form__label"
        >
          Article title:
        </label>
        <input
          id="art-create-text"
          className="create-article-form__field create-article-form__title"
          type="text"
          value={this.state.title}
          onChange={event => this.handleTitleChange(event)}
        />
        <label
          htmlFor="art-create-title"
          className="create-article-form__label"
        >
          Article image:
        </label>
        <input
          id="art-create-text"
          className="create-article-form__field create-article-form__title"
          type="text"
          value={this.state.image}
          onChange={event => this.handleImageChange(event)}
        />
        <label className="create-article-form__label" htmlFor="art-create-text">
          Article content:
        </label>
        <textarea
          className="create-article-form__field create-article-form__text"
          id="art-create-text"
          rows="10"
          value={this.state.content}
          onChange={event => this.handleContentChange(event)}
        />
        <input
					className="create-article-form__submit"
					type="submit"
					onClick={event => this.createArticle(event)}
				/>
      </form>
    );
  }
}

export default CreateArticle;
