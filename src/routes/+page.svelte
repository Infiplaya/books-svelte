<script lang="ts">
	import type { PageData } from './$types';
	import BookCard from '../lib/components/BookCard.svelte';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import { onDestroy } from 'svelte';
	import type { Book } from '@prisma/client';
	export let data: PageData;
	$: ({ userLists, user } = data);

	interface SearchBook extends Book {
		searchTerms: string;
	}

	const searchBooks: SearchBook[] = data.books.map((book) => ({
		...book,
		searchTerms: `${book.title} ${book.description}`
	}));

	const searchStore = createSearchStore(searchBooks);
	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));
	onDestroy(() => {
		unsubscribe();
	});
</script>

<svelte:head>
	<title>Books-Svelte</title>
	<meta name="description" content="Books app" />
</svelte:head>

<section class="books">
	<h1>Books</h1>
	<div class="search-div">
		<h2>Search</h2>
		<input type="search" placeholder="Search..." bind:value={$searchStore.search} />
	</div>
	{#if $searchStore.filtered.length === 0}
		No results...
	{/if}
	{#each $searchStore.filtered as book}
		<BookCard {book} {userLists} isDetailPage={false} {user} />
	{/each}
</section>

<style>
	input {
		display: block;
		padding: 0.625rem;
		padding-left: 2.5rem;
		background-color: #f9fafb;
		color: #111827;
		font-size: 0.875rem;
		line-height: 1.25rem;
		width: 100%;
		border-width: 1px;
		border-color: #d1d5db;
	}

	input:focus {
		outline: var(--color-theme-3) 2px solid;
	}
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
