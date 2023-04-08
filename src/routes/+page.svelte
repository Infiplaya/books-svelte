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
<input type="text" on:input={() => filterBooks} bind:value={search} />
<section class="books">
	{#await data.streamed.books}
		Loading...
	{:then books}
		{#each filterBooks(books, search) as book}
			<BookCard {book} {userLists} {form} />
		{/each}
	{:catch error}
		{error.message}
	{/await}
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
		margin-top: 5rem;
	}

	h1 {
		margin: 20px 0px;
	}
</style>
