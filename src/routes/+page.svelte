<script lang="ts">
	import type { PageData } from './$types';
	import BookCard from '../lib/components/BookCard.svelte';
	export let data: PageData;
	$: ({ books, userLists, user } = data);
</script>

<svelte:head>
	<title>Books-Svelte</title>
	<meta name="description" content="Books app" />
</svelte:head>

<section class="books">
	<h1>Books</h1>
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
	}
	
	h1 {
		margin: 20px 0px;
	}
</style>
