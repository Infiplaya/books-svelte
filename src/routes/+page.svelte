<script lang="ts">
	import type { Book } from '@prisma/client';
	import type { PageData } from './$types';
	import BookCard from './BookCard.svelte';
	export let data: PageData;
	$: ({ books, userLists, user } = data);

	let filteredBooks: Book[] = [];

	let search = '';

	const searchBooks = () => {
		return (filteredBooks = books.filter((book) => {
			let bookTitle = book.title.toLowerCase();
			return bookTitle.includes(search.toLowerCase());
		}));
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Books app" />
</svelte:head>

<section class="books">
	<h1>Books</h1>
	<fieldset class="book-filter">
		<label for="filter-input">Search books</label>
		<input
			type="text"
			on:input={searchBooks}
			bind:value={search}
			class="filter-input"
			id="filter-input"
		/>
	</fieldset>
	{#if search && filteredBooks.length === 0}
		<h2>No books</h2>
	{:else if filteredBooks.length > 0}
		{#each filteredBooks as book}
			<BookCard {book} {userLists} isDetailPage={false} {user} />
		{/each}
	{:else}
		{#each books as book}
			<BookCard {book} {userLists} isDetailPage={false} {user} />
		{/each}
	{/if}
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
