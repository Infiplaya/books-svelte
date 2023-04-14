<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import ReadingButton from '$lib/components/ReadingButton.svelte';
	import FinishedButton from '$lib/components/FinishedButton.svelte';
	import WantToRead from '$lib/components/WantToRead.svelte';
	import FavoriteButton from '$lib/components/FavoriteButton.svelte';

	export let data: PageData;
	$: ({ book, userLists } = data);

	export let form;

	let readingLoading = false;
	let finishedLoading = false;

	function handleReadingLoading() {
		readingLoading = true;

		return async ({ update }: { update: () => Promise<void> }) => {
			await update();
			readingLoading = false;
		};
	}

	function handleFinishedLoading() {
		finishedLoading = true;

		return async ({ update }: { update: () => Promise<void> }) => {
			await update();
			finishedLoading = false;
		};
	}
</script>

<svelte:head>
	<title>{book.title}</title>
	<meta name="description" content="Books app" />
</svelte:head>

<section class="book" id="book">
	<div class="card-grid">
		<div class="left-panel">
			<img src={book.image} alt={book.title} width="200" class="book-img" />
			<div class="action-buttons">
				<ReadingButton {userLists} {book} />
				<FinishedButton {userLists} {book} />
				<WantToRead {userLists} {book} />
				<FavoriteButton {userLists} {book} />
				{#if form?.message}<p class="error">Sign in to perform this action!</p>{/if}
			</div>
		</div>

		<div class="info">
			<h1>{book.title}</h1>
			<h2>{book.author}</h2>
			<p class="description">{book.description}</p>
		</div>
	</div>

	<section class="comments" id="comments">
		<form action="?/addComment" method="POST" use:enhance class="comment-form">
			<input type="hidden" value={book.id} id="id" name="id" />
			<label for="text">Type a comment</label>
			<textarea id="text" name="text" />
			<button type="submit" class="primary-button">Send</button>
		</form>
		<h3>Comments</h3>
		{#each book.comments as comment}
			<div class="comment">
				<p class="author">{comment.user.username}:</p>
				<p>{comment.text}</p>
			</div>
		{/each}
	</section>
</section>

<style>
	textarea {
		resize: none;
		height: 5rem;
		width: 100%;
		font-size: 1rem;
		border-radius: 10px;
	}

	h3 {
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.comment-form {
		display: flex;
		flex-direction: column;
		gap: 10px;
		align-items: flex-start;
	}
	.comments {
		margin-top: 2rem;
	}

	.author {
		font-weight: 700;
	}

	.comment {
		display: flex;
		gap: 1rem;
		padding: 1rem;
		box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		margin-top: 2rem;
	}
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
		margin-top: 10px;
		background-color: var(--color-white);
		padding: 20px;
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
		flex-wrap: wrap;
	}

	@keyframes lds-hourglass {
		0% {
			transform: rotate(0);
			animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
		}
		50% {
			transform: rotate(900deg);
			animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
		}
		100% {
			transform: rotate(1800deg);
		}
	}

	@media (min-width: 1028px) {
		.card-grid {
			display: grid;
			grid-template-columns: repeat(12, minmax(0, 1fr));
			gap: 100px;
		}

		.book {
			padding: 80px;
		}

		textarea {
			width: 65%;
		}
	}
</style>
