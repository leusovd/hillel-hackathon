<template>
	
	<div class="jokeBlock">

		<div class="joke">
			<div class="border"></div>
			<p>{{ currentJoke }}</p>
			<div class="border"></div>
		</div>
		
		<button
			id="randomJoke"
			@click="$emit('onGetRandomJoke')"
		>Random joke</button>

	</div>

</template>

<script>

	export default {
		props: ['joke'],

		data() {
			return {

				

			}
		},
		computed: {
			currentJoke() {
				return `\"${this.joke}\"`;
			}
		}

	}
</script>

<style lang="sass" scoped>
	.jokeBlock
		display: flex
		flex-direction: column
		align-items: center
		justify-content: space-between
		height: 250px
		width: 300px
	.border
		height: 20%
		width: 100%
		background: url('../assets/chuck-mini.png') center no-repeat/contain
	.joke
		display: flex
		flex-direction: column
		justify-content: space-between
		height: 80%
		padding: 10px
		text-align: center
	#randomJoke
		padding: 5px
		border: 1px solid #F2592B
		border-radius: 5px
		background: transparent
		color: #F2592B
		text-align: center
		cursor: pointer
		&:hover
			background: lighten(#F2592B, 42%);
			transition: .3s ease-out
	button:focus
		outline: none


</style>