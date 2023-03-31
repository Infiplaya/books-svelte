<script lang="ts">
	import type { PageData } from './$types';
	import BookCard from '../lib/components/BookCard.svelte';
	export let data: PageData;
	$: ({ books, userLists, user, streamed } = data);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Books app" />
</svelte:head>

<section class="books">
	<h1>Books</h1>

	{#each books as book}
		<BookCard {book} {userLists} isDetailPage={false} {user} />
	{/each}

	{#await streamed.rest}
		Loading More books...
	{:then books}
		{#each books as book}
			<BookCard {book} {userLists} isDetailPage={false} {user} />
		{/each}
	{:catch error}
		{error.message}
	{/await}
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

	.filter-input {
		padding: 6px 12px;
		box-shadow: 0px 0px 1px rgb(190, 172, 172);
	}

	.filter-input:focus {
		outline-color: var(--color-theme-1);
	}

	.book-filter {
		display: flex;
		flex-direction: column;
		border: none;
		font-size: 1.2rem;
		gap: 10px;
		margin-top: -26px;
	}

	h1 {
		margin: 20px 0px;
	}
</style>
