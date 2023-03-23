<script lang="ts">
	type User = {
		userId: string;
		username: string;
	} | null;

	import { enhance } from '$app/forms';
	import type { Book } from '@prisma/client';
	import type { PageData } from '../../routes/$types';
	import FaRegBookmark from 'svelte-icons/fa/FaRegBookmark.svelte';
	import FaBookmark from 'svelte-icons/fa/FaBookmark.svelte';
	import FaPlusCircle from 'svelte-icons/fa/FaPlusCircle.svelte';
	import FaCheckCircle from 'svelte-icons/fa/FaCheckCircle.svelte';

	export let book: Book;
	export let userLists: PageData['userLists'];
	export let isDetailPage: boolean;
	export let user: User;

	function truncateString(str: string, maxLength: number = 250) {
		if (str.length > maxLength) {
			return str.slice(0, maxLength - 3) + '...';
		} else {
			return str;
		}
	}

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

	let readingLoading = false;
	let finishedLoading = false;
</script>

<div class="book-card">
	<a href="/books/{book.id}">
		<div class="card-grid">
			<img src={book.image} alt={book.title} class="book-img" width="150" />
			<div class="info">
				<h2>{book.title}</h2>
				<h3>{book.author}</h3>
				{#if isDetailPage}
					<p>{book.description}</p>
				{:else}
					<p>{truncateString(book.description)}</p>
				{/if}
			</div>
		</div>
	</a>
	<div class="flex">
		<div class="action-buttons">
			{#if readingLoading}
				<div class="lds-hourglass" />
			{:else if userLists?.readingList.map((item) => item.id).includes(book.id)}
				<form
					action="?/removeFromReadingList"
					method="POST"
					use:enhance={({ form, data, action, cancel, submitter }) => {
						readingLoading = true;

						return async ({ result, update }) => {
							await update();
							readingLoading = false;
						};
					}}
				>
					<input type="hidden" value={book.id} id="id" name="id" />

					<button class="icon" aria-current="true" type="submit" title="Remove from reading list">
						<FaBookmark />
					</button>
				</form>
			{:else}
				<form
					action="?/addToReadingList"
					method="POST"
					use:enhance={({ form, data, action, cancel, submitter }) => {
						readingLoading = true;

						return async ({ result, update }) => {
							await update();
							readingLoading = false;
						};
					}}
				>
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

			{#if finishedLoading}
				<div class="lds-hourglass" />
			{:else if userLists?.finishedList.map((item) => item.id).includes(book.id)}
				<form
					action="?/removeFromFinishedList"
					method="POST"
					use:enhance={({ form, data, action, cancel, submitter }) => {
						finishedLoading = true;

						return async ({ result, update }) => {
							await update();
							finishedLoading = false;
						};
					}}
				>
					<input type="hidden" value={book.id} id="id" name="id" />
					<button class="icon" type="submit" aria-current="true" title="Mark as unfinished">
						<FaCheckCircle />
					</button>
				</form>
			{:else}
				<form
					action="?/addToFinishedList"
					method="POST"
					use:enhance={({ form, data, action, cancel, submitter }) => {
						finishedLoading = true;

						return async ({ result, update }) => {
							await update();
							finishedLoading = false;
						};
					}}
				>
					<input type="hidden" value={book.id} id="id" name="id" />
					<button class="icon" type="submit" title="Add to finished" on:click={handleFinishedError}>
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
</div>

<style>
	.error {
		color: var(--color-theme-2);
		margin-top: 5px;
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
		transition: all;
		transition-duration: 200ms;
	}
	.icon:hover {
		transform: scale(1.2);
	}

	.icon[aria-current='true'] {
		color: var(--color-theme-3);
	}

	.book-card {
		box-shadow: 0px 0px 4px rgb(190, 172, 172);
		background-color: var(--color-white);
		padding: 30px;
		max-width: 400px;
		height: 550px;
		display: flex;
		flex-direction: column;
	}

	.book-img {
		align-self: center;
	}

	.flex {
		display: flex;
		flex-direction: row-reverse;
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
	.action-buttons {
		align-self: flex-end;
		margin-top: 10px;
		display: flex;
		gap: 10px;
	}

	.lds-hourglass {
		display: inline-block;
		position: relative;
		width: 36px;
		height: 36px;
	}
	.lds-hourglass:after {
		content: ' ';
		display: block;
		border-radius: 50%;
		width: 0;
		height: 0;
		box-sizing: border-box;
		border: 20px solid var(--color-theme-2);
		border-color: var(--color-theme-2) transparent var(--color-theme-2) transparent;
		animation: lds-hourglass 1.2s infinite;
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

	@media (min-width: 640px) {
		.card-grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}

		.book-card {
			height: 500px;
		}
	}
</style>