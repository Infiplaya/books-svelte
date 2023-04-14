<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Book } from '@prisma/client';
	import type { PageData } from '../../routes/$types';
	import FaCheck from 'svelte-icons/fa/FaCheck.svelte';

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
{:else if userLists?.wantToRead.map((item) => item.id).includes(book.id)}
	<form action="?/removeWantToRead" method="POST" use:enhance={handleFinishedLoading}>
		<input type="hidden" value={book.id} id="id" name="id" />
		<button aria-current="true" type="submit" title="Remove from reading list">
			<div class="flex">
				<div class="icon"><FaCheck /></div>
				<span>Want Read</span>
			</div>
		</button>
	</form>
{:else}
	<form action="?/addWantToRead" method="POST" use:enhance={handleFinishedLoading}>
		<input type="hidden" value={book.id} id="id" name="id" />
		<button type="submit" title="Add to finished">Want Read</button>
	</form>
{/if}

<style>
	button {
		cursor: pointer;
		padding: 0.25rem 1rem;
	}

	.icon {
		width: 1rem;
		height: 1rem;
	}
	.flex {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	button[aria-current='true'] {
		background-color: rgba(8, 255, 82, 0.25);
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
