import React from 'react';
import * as axios from 'axios';
import Header from './Header';
import Container from './Container'
import Article from './Article.jsx'
import Login from './Login.jsx'
import CreateArticle from './CreateArticle.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.cars = createCars();
		this.people = createPeople();
		this.comments = createComments();
		this.replies = createReplies();
		this.users = createUsers();

		this.state = {
			users: [...this.users],
			articles: [...this.cars, ...this.people],
			comments: [...this.comments, ...this.replies],
			currentUser: this.users[0],
			currentCategory: '',
			activeArticle: '',
			loginPage: false,
			createArticle: false
		}	
	}


	componentDidMount() {
		axios.get('http://37.59.228.228:8080/article')
			.then(function (response) {
				console.log(response.data.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	openCreateArticle() {
		this.setState({createArticle: true});
	}

	logoutUser() {
		this.setState({ currentUser: '' });
	}

	chooseCategory(category) {
		this.setState({currentCategory: category});
	}	

	openArticle(id) {
		const activeArticle = this.state.articles.find(el => {
			return el.id === id;
		});
		this.setState({activeArticle: activeArticle});
	}

	renderContent() {
		const article = this.state.activeArticle;

		if (article) {
			return (
				<Article
					data={article}
					comments={this.state.comments}
					currentUser={this.state.currentUser}
					users={this.state.users}
					activeArticle={article}
					onAddComment={comment => this.addComment(comment)}
				/>
			);
		} else {
			return (
				<Container
					articles={this.state.articles}
					category={this.state.currentCategory}
					onOpenArticle={id => this.openArticle(id)}
				/>
			);
		}			
	}

	openLoginPage() {
		this.setState({loginPage: true});
	}
	closeLoginPage(event) {
		if (event.target.className === 'login-form') {
			this.setState({loginPage: false});
		}		
	}

	addComment(comment) {
		const comments = [...this.state.comments, comment];
		this.setState({ comments: comments });
	}
	addArticle(article) {
		const articles = [...this.state.articles, article];
		this.setState({articles: articles, createArticle: false});
	}

	renderLoginPage() {
		if (this.state.loginPage) {
			document.body.classList.add('stop-scrolling');
			return (
				<Login
					onCloseLoginPage={event => this.closeLoginPage(event)}
				/>
			);
		} else {
			document.body.classList.remove('stop-scrolling');
		}
	}

	renderCreateArticlePage() {
		if (this.state.createArticle) {
			document.body.classList.add('stop-scrolling');
			return (
				<CreateArticle
					nextArticleId={this.state.articles.length}
					onAddArticle={article => this.addArticle(article)}
				/>
			);
		} else {
			document.body.classList.remove('stop-scrolling');
		}
	}	

	render() {
		return (
			<div className="app">
				<Header					
					category={this.state.currentCategory}
					onChooseCategory={category => this.chooseCategory(category)}
					currentUser={this.state.currentUser}
					onOpenLoginPage={() => this.openLoginPage()}
					activeArticle={this.state.activeArticle}
					onOpenCreateArticle={() => this.openCreateArticle()}					
					onLogout={() => this.logoutUser()}					
				/>
				{this.renderContent()}
				{this.renderLoginPage()}		
				{this.renderCreateArticlePage()}		
			</div>
		);
	}
}

export default App;

function createCars() {
	const articles = [];
	const date = new Date().getTime();
	for (let i = 1; i <= 5; i++) {
		articles.push({
			id: `${i}`,
			title: `title${i}`,
			date: `${date - (20000 * i)}`,
			content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo omnis dolor modi assumenda, soluta earum minima blanditiis beatae nam officiis, fugiat, voluptates est et officia quis in iure, nulla numquam.',
			image: `./images/cars${i}.jpg`,
			category: `cars`
		});
	}
	return articles;
}
function createPeople() {
	const articles = [];
	const date = new Date().getTime();
	for (let i = 6; i < 12; i++) {
		
		articles.push({
			id: `${i}`,
			title: `title${i}`,
			date: `${date - (10000 * i)}`,
			content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo omnis dolor modi assumenda, soluta earum minima blanditiis beatae nam officiis, fugiat, voluptates est et officia quis in iure, nulla numquam.',
			image: `./images/people${i - 5}.jpg`,
			category: `people`
		});
	}
	return articles;
}

function createComments() {
	const comments = [];
	for (let i = 1; i <= 8; i++) {
		comments.push({
			id: `${i}`,
			date: `date${i}`,
			userId: `${i}`,
			title: `title${i}`,
			content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo omnis dolor modi assumenda, soluta earum minima blanditiis beatae nam officiis, fugiat, voluptates est et officia quis in iure, nulla numquam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo omnis dolor modi assumenda, soluta earum minima',
			articleId: `${1}`,
			parent: ''
		});
	}
	return comments;
}
function createReplies() {
	const comments = [];
	for (let i = 11; i <= 20; i++) {
		comments.push({
			id: `${i}`,
			date: `date${i}`,
			userId: `${i}`,
			title: `title${i}`,
			content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo omnis dolor modi assumenda, soluta earum minima blanditiis beatae nam officiis, fugiat, voluptates est et officia quis in iure, nulla numquam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo omnis dolor modi assumenda, soluta earum minima',
			articleId: `${i}`,
			parent: (i < 15) ? 1 : 2
		});
	}
	return comments;
}

function createUsers() {
	const users = [];
	for (let i = 1; i <= 12; i++) {
		users.push({
			id: `${i}`,
			email: `user${i}@gmail.com`,
			password: `password${i}`,
			name: `name${i}`,
			avatar: `./images/avatars/user${i > 8 ? i - 8 : i}.jpg`
		});
	}
	return users;
}

// ./images/cars2.jpg