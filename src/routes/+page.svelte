<script lang="ts">
	import type { PageData } from './$types';
	import BookCard from './BookCard.svelte';
	export let data: PageData;
	$: ({ books, userLists, user } = data);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Books app" />
</svelte:head>
<h1>Books</h1>
<section class="books">
	{#each books as book}
		<BookCard {book} {userLists} isDetailPage={false} {user} />
	{/each}
</section>

<style>
	.books {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 40px;
		width: 100%;
	}

	h1 {
		margin: 20px 0px;
	}
</style>
