<script lang="ts">
	import type { PageData } from './$types';
	import BookCard from '../lib/components/BookCard.svelte';
	export let data: PageData;
	$: ({ userLists, user, books } = data);
</script>

<svelte:head>
	<title>Books-Svelte</title>
	<meta name="description" content="Books app" />
</svelte:head>

<section class="books">
	<h1>Books</h1>
	<div class="search-div">
		<h3>Search</h3>
		<form method="GET">
			<input type="search" placeholder="Search..." id="search" name="search" />
		</form>
	</div>
	{#each books as book}
		<BookCard {book} {userLists} {user} />
	{/each}
	{#await data.streamed.rest}
		<p>streaming delayed data from the server...</p>
	{:then rest}
		{#each rest as book}
			<BookCard {book} {userLists} {user} />
		{/each}
	{/await}
	<!-- <div>
		{#if currentPage > 1}
			<a href={`?page=${currentPage - 1}`} class="primary-button">Previous</a>
		{/if}
		{#if currentPage < totalPages}
			<a href={`?page=${currentPage + 1}`} class="primary-button">Next</a>
		{/if}
	</div> -->
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
