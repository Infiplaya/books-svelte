<script lang="ts">
	import type { PageData } from "./$types";
	import BookCard from "./BookCard.svelte";
	export let data: PageData;
	$: ({books, userLists} = data)

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Books app" />
</svelte:head>

<section>

 <section class="books">
	{#each books as book}
	<BookCard book={book} userLists={userLists}/>
	{/each}
 </section>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	h2 {
		font-size: 28px;
	}


	.books {
		display: flex;
		flex-direction: column;
		gap: 40px;
	}

	.book-card {
		background-color: aquamarine;
		padding: 40px;
		border-radius: 20px;
		width: 400px;
		min-height: 150px;
		display: flex;
		flex-direction: column;
	}

	.book-img {
		align-self: center;
	}


</style>
