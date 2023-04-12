<script lang="ts">
	import type { Book } from '@prisma/client';
	import type { ActionData, PageData } from '../../routes/$types';
	import ReadingButton from './ReadingButton.svelte';
	import FinishedButton from './FinishedButton.svelte';

	export let book: Book;
	export let userLists: PageData['userLists'];
	export let form: ActionData;

	function truncateString(str: string, maxLength: number = 250) {
		if (str.length > maxLength) {
			return str.slice(0, maxLength - 3) + '...';
		} else {
			return str;
		}
	}
</script>

<div class="book-card">
	<a href="/books/{book.id}">
		<div class="card-grid">
			<img src={book.image} alt={book.title} class="book-img" width="150" loading="lazy" />
			<div class="info">
				<h2>{book.title}</h2>
				<h3>{book.author}</h3>
				<p class="text-sm">{truncateString(book.description)}</p>
			</div>
		</div>
	</a>
	<div class="flex">
		<div class="action-buttons">
			<ReadingButton {userLists} {book} />
			<FinishedButton {userLists} {book} />
		</div>
		{#if form?.message}<p class="error">Sign in to perform this action!</p>{/if}
	</div>
</div>

<style>
	.error {
		color: var(--color-theme-2);
		margin-top: 5px;
	}

	.book-card {
		box-shadow: 0px 0px 4px rgb(190, 172, 172);
		background-color: var(--color-white);
		padding: 30px;
		max-width: 400px;
		display: flex;
		flex-direction: column;
	}

	.book-img {
		align-self: center;
	}

	.flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.action-buttons {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.card-grid {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.info {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	@media (min-width: 640px) {
		.card-grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
