<script lang="ts">
	import type { PageData } from './$types';
	import BookCard from '../lib/components/BookCard.svelte';
	import type { Book } from '@prisma/client';
	export let data: PageData;
	$: ({ userLists } = data);
	export let form;

	let search = '';

	function filterBooks(books: Book[], search: string) {
		const keywords = search
			.toLowerCase()
			.split(' ')
			.filter((s) => s !== '');
		if (keywords.length === 0) {
			return books;
		}
		return books.filter((book) => {
			const words = (book.title + ' ' + book.author).toLowerCase().split(' ');
			return keywords.every((kw) => words.some((w) => w.startsWith(kw)));
		});
	}
</script>

<svelte:head>
	<title>Books-Svelte</title>
	<meta name="description" content="Books app" />
</svelte:head>

<h1>Books</h1>
<section class="container" id="container">
	<label for="search-books">Search</label>
	<input type="text" on:input={() => filterBooks} bind:value={search} id="search-books" />
	<section class="books" id="books">
		{#each filterBooks(data.books, search) as book}
			<BookCard {book} {userLists} {form} />
		{/each}
		{#if filterBooks(data.books, search).length === 0}
			<h3>No books</h3>
		{/if}
	</section>
</section>

<style>
	.container {
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	label {
		font-size: 1.2rem;
	}
	input {
		display: block;
		padding-top: 0.3rem;
		padding-bottom: 0.3rem;
		background-color: #f9fafb;
		color: #111827;
		font-size: 0.875rem;
		line-height: 1.25rem;
		border-width: 1px;
		border-color: #d1d5db;
		width: 100%;
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
		margin-top: 5rem;
	}

	h1 {
		margin: 20px 0px;
	}

	@media (min-width: 680px) {
		input {
			width: 460px;
			margin-left: 0;
			margin-right: 0;
		}
	}
</style>
