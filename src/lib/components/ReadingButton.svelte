<script lang="ts">
	import FaRegBookmark from 'svelte-icons/fa/FaRegBookmark.svelte';
	import FaBookmark from 'svelte-icons/fa/FaBookmark.svelte';
	import { enhance } from '$app/forms';
	import type { PageData } from '../../routes/$types';
	import type { Book } from '@prisma/client';

	export let userLists: PageData['userLists'];
	export let book: Book;

	let readingLoading = false;

	function handleReadingLoading() {
		readingLoading = true;

		return async ({ update }: { update: () => Promise<void> }) => {
			await update();
			readingLoading = false;
		};
	}
</script>

{#if readingLoading}
	<div class="lds-hourglass" />
{:else if userLists?.readingList.map((item) => item.id).includes(book.id)}
	<form action="?/removeFromReadingList" method="POST" use:enhance={handleReadingLoading}>
		<input type="hidden" value={book.id} id="id" name="id" />

		<button class="icon" aria-current="true" type="submit" title="Remove from reading list">
			<FaBookmark />
		</button>
	</form>
{:else}
	<form action="?/addToReadingList" method="POST" use:enhance={handleReadingLoading}>
		<input type="hidden" value={book.id} id="id" name="id" />
		<button class="icon" type="submit" title="Add to reading list">
			<FaRegBookmark />
		</button>
	</form>
{/if}

<style>
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
</style>
