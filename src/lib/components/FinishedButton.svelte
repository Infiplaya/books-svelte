<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Book } from '@prisma/client';
	import type { PageData } from '../../routes/$types';
	import FaPlusCircle from 'svelte-icons/fa/FaPlusCircle.svelte';
	import FaCheckCircle from 'svelte-icons/fa/FaCheckCircle.svelte';

	let finishedLoading = false;

	function handleFinishedLoading() {
		finishedLoading = true;

		return async ({ update }: { update: () => Promise<void> }) => {
			await update();
			finishedLoading = false;
		};
	}

	export let userLists: PageData['userLists'];
	export let book: Book;
</script>

{#if finishedLoading}
	<div class="lds-hourglass" />
{:else if userLists?.finishedList.map((item) => item.id).includes(book.id)}
	<form action="?/removeFromFinishedList" method="POST" use:enhance={handleFinishedLoading}>
		<input type="hidden" value={book.id} id="id" name="id" />
		<button class="icon" type="submit" aria-current="true" title="Mark as unfinished">
			<FaCheckCircle />
		</button>
	</form>
{:else}
	<form action="?/addToFinishedList" method="POST" use:enhance={handleFinishedLoading}>
		<input type="hidden" value={book.id} id="id" name="id" />
		<button class="icon" type="submit" title="Add to finished">
			<FaPlusCircle />
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
