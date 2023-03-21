
<script lang="ts">
	import type { PageData } from "./$types";
	export let data: PageData;
	import BookCard from "../BookCard.svelte";
	$: ({userLists} = data)
    $: finishedList = userLists!.finishedList

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Books app" />
</svelte:head>

<section>
 <h1>Hello, world</h1>

 <section class="books">
	{#each finishedList as book}
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

	.book-form {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.books {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.book-card {
		background-color: aquamarine;
		padding: 40px;
		border-radius: 20px;
		width: 200px;
		min-height: 150px;
	}

	textarea {
		min-height: 200px;
		min-width: 350px;
	}

</style>
