<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import FaRegBookmark from 'svelte-icons/fa/FaRegBookmark.svelte';
	import FaBookmark from 'svelte-icons/fa/FaBookmark.svelte';
	import FaPlusCircle from 'svelte-icons/fa/FaPlusCircle.svelte';
	import FaCheckCircle from 'svelte-icons/fa/FaCheckCircle.svelte';

	export let data: PageData;
	$: ({ book, userLists, user } = data);

	let readingError: string;

	function handleReadingError() {
		finishedError = '';
		if (!user) {
			readingError = 'Only logged in users can add books to reading list';
		}
		return;
	}

	let finishedError: string;

	function handleFinishedError() {
		readingError = '';
		if (!user) {
			finishedError = 'Only logged in users can mark books as finished';
		}
		return;
	}
</script>

<svelte:head>
	<title>{book.title}</title>
	<meta name="description" content="Books app" />
</svelte:head>

<section class="book">
	<div class="card-grid">
		<div class="left-panel">
			<img src={book.image} alt={book.title} width="200" class="book-img" />
			<div class="action-buttons">
				{#if userLists?.readingList.map((item) => item.id).includes(book.id)}
					<form action="?/removeFromReadingList" method="POST" use:enhance>
						<input type="hidden" value={book.id} id="id" name="id" />
						<button class="icon" aria-current="true" type="submit" title="Remove from reading list">
							<FaBookmark />
						</button>
					</form>
				{:else}
					<form action="?/addToReadingList" method="POST" use:enhance>
						<input type="hidden" value={book.id} id="id" name="id" />
						<button
							class="icon"
							type="submit"
							title="Add to reading list"
							on:click={handleReadingError}
						>
							<FaRegBookmark />
						</button>
					</form>
				{/if}
				{#if userLists?.finishedList.map((item) => item.id).includes(book.id)}
					<form action="?/removeFromFinishedList" method="POST" use:enhance>
						<input type="hidden" value={book.id} id="id" name="id" />
						<button class="icon" type="submit" aria-current="true" title="Mark as unfinished">
							<FaCheckCircle />
						</button>
					</form>
				{:else}
					<form action="?/addToFinishedList" method="POST" use:enhance>
						<input type="hidden" value={book.id} id="id" name="id" />
						<button
							class="icon"
							type="submit"
							title="Add to finished"
							on:click={handleFinishedError}
						>
							<FaPlusCircle />
						</button>
					</form>
				{/if}
			</div>
			{#if readingError}
				<p class="error">{readingError}</p>
			{/if}
			{#if finishedError}
				<p class="error">{finishedError}</p>
			{/if}
		</div>

		<div class="info">
			<h1>{book.title}</h1>
			<h2>{book.author}</h2>
			<p class="description">{book.description}</p>
		</div>
	</div>
</section>

<style>
	.error {
		color: var(--color-theme-2);
		margin-top: 5px;
		padding-right: 40px;
	}
	h1 {
		text-align: left;
		font-size: 2rem;
		margin-top: 16px;
	}
	.book {
		margin-top: 20px;
	}
	.icon {
		background-color: transparent;
		border: none;
		width: 36px;
		height: 36px;
		cursor: pointer;
		color: var(--color-theme-1);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	.icon:hover {
		transform: scale(1.2);
	}

	.icon[aria-current='true'] {
		color: var(--color-theme-3);
	}

	.book-img {
		box-shadow: 1px 1px 10px;
	}

	.left-panel {
		grid-column: span 3 / span 3;
		margin-top: 10px;
	}

	.card-grid {
		display: flex;
		flex-direction: column;
	}

	.description {
		margin-top: 24px;
		font-size: 18px;
	}

	.info {
		display: flex;
		flex-direction: column;
		grid-column: span 6 / span 6;
	}
	.action-buttons {
		display: flex;
		gap: 10px;
		margin-top: 20px;
	}

	@media (min-width: 640px) {
		.card-grid {
			display: grid;
			grid-template-columns: repeat(12, minmax(0, 1fr));
		}
	}
</style>
