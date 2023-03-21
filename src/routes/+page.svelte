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
	<BookCard book={book} userLists={userLists} isDetailPage={false}/>
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

	.books {
		display: flex;
		flex-direction: column;
		gap: 40px;
	}



</style>
