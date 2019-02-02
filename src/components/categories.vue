<template>

	
		<div class="categoriesBlock">
			<ul>
				<li
					v-for="cat in shownCategories"
					:key="cat"
				>
				<a
					:class="{'active': cat === currentCategoryProp}"
					href="#"
					@click="chooseCategory(cat)"
				>{{ cat }}
				</a>
				</li>
			</ul>
			<button
				@click="showMoreCategories"
			>
				{{numberOfCategories === categoriesProp.length ? 'close' : 'more'}}
			</button>
		</div>
	

</template>

<script>

	export default {

		props: ['categoriesProp', 'currentCategoryProp'],

		data() {
			return {

				categories: [],
				numberOfCategories: 10,
				curCat: ''

			}
		},
		computed: {
			shownCategories() {
				let arr = [];
				for (let i = 0; i < this.numberOfCategories; i++) {
					arr.push(this.categoriesProp[i]);
				}
				return arr;
			},
			currentCategory() {
				return this.currentCategoryProp;
			}
		},
		methods: {
			showMoreCategories() {
				if (this.numberOfCategories !== this.categoriesProp.length) {
					this.numberOfCategories += 2;
				} else {
					this.numberOfCategories = 10;
				}
				if (this.categoriesProp.length - this.numberOfCategories === 1) {
					this.numberOfCategories += 1;
				}
			},
			chooseCategory(category) {
				this.$emit('onChooseCategory', category);
			}
		}		
		
	}
</script>

<style lang="sass" scoped>
	.categoriesBlock
		height: auto
		width: 100px
		border: .5px solid #000
		border-radius: 10px
		text-align: center
	ul
		margin: 0
		padding: 0
		list-style-type: none
	a:link, a:visited, a:active, a:hover
		text-decoration: none
	a
		display: block
		padding: 2px
		color: #F2592B
		&:hover
			color: lighten(#F2592B, 10%)
	a.active
		color: black
		text-decoration: underline
	button
		padding: 5px
		border: none
		background: transparent
		cursor: pointer
		color: #F2592B
		&:focus
			outline: none	

</style>


