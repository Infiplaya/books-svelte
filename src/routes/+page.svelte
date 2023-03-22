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
<h1>Books</h1>
 <section class="books">
	{#each books as book}
	<BookCard book={book} userLists={userLists} isDetailPage={false}/>
	{/each}
 </section>

<style>
	.books {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 40px;
	}

	 h1 {
		font-family: 'Handlee';
	 }

</style>
