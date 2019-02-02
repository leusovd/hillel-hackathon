<template>
  
	<div id="app">
		<div class="logo"></div>
		<div class="container">
			<categories
				:categoriesProp="categories"
				:currentCategoryProp="chosenCategory"
				@onChooseCategory="chooseCategory"
			></categories>
			<joke
				:joke="joke"
				@onGetRandomJoke="getRandomJoke"
			></joke>
		</div>
		

	</div>

</template>

<script>
	import categories from "./components/categories.vue";
	import jokes from "./components/jokes.vue";
	import axios from 'axios';

	export default {

		data() {
			return {
				categories: '',
				joke: '',
				chosenCategory: ''
			}			
		},
		methods: {
			chooseCategory(category) {
				this.chosenCategory = category;
				this.getRandomJoke();
			},
			getRandomJoke() {
				let url = 'https://api.chucknorris.io/jokes/random';
				if (this.chosenCategory) {
					url = `https://api.chucknorris.io/jokes/random?category=${this.chosenCategory}`;
				}
				axios.get(url)
				.then(response => {
					this.joke = response.data.value;
				})
				.catch(e => {
					console.log(e);
				});
			},
			getCategories() {
				const url = 'https://api.chucknorris.io/jokes/categories';
				axios.get(url)
				.then(response => {
					this.categories = response.data;
				})
				.catch(e => {
					console.log(e);
				});
			}
		},
		created() {
			this.getCategories();
			this.getRandomJoke();
		},
		components: {
			categories: categories,
			joke: jokes
		}

	}
	

</script>

<style lang="sass">
	#app
		display: flex
		flex-direction: column
		align-items: center
		width: 400px
		padding-top: 10px
		margin: 0 auto
	.logo
		height: 119px
		width: 193px
		margin-bottom: 20px
		background: url('assets/chuck-logo.png') center/contain no-repeat
	.container
		display: flex
		font-family: sans-serif

</style>
