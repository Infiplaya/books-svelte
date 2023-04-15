<script lang="ts">
	import FaCheck from 'svelte-icons/fa/FaCheck.svelte';
	import { enhance } from '$app/forms';
	import type { PageData } from '../../routes/$types';
	import type { Book } from '@prisma/client';

	export let userLists: PageData['userLists'];
	export let book: Book;

	let loading = false;

	function handleLoading() {
		loading = true;

		return async ({ update }: { update: () => Promise<void> }) => {
			await update();
			loading = false;
		};
	}
</script>

{#if userLists?.justReading.map((item) => item.id).includes(book.id)}
	<form action="?/removeFromReadingList" method="POST" use:enhance={handleLoading}>
		<input type="hidden" value={book.id} id="id" name="id" />

		<button aria-current="true" type="submit" title="Remove from reading list">
			{#if loading}
				<span class="loader" />
			{:else}
				<div class="flex">
					<div class="icon"><FaCheck /></div>
					<span>Reading</span>
				</div>
			{/if}
		</button>
	</form>
{:else}
	<form action="?/addToReadingList" method="POST" use:enhance={handleLoading}>
		<input type="hidden" value={book.id} id="id" name="id" />
		<button type="submit" title="Add to reading list"
			>{#if loading}
				<span class="loader" />
			{:else}
				Reading
			{/if}</button
		>
	</form>
{/if}

<style>
	button {
		cursor: pointer;
		padding: 0.25rem 1rem;
		min-width: 8rem;
		min-height: 2rem;
		display: inline-flex;
		justify-content: center;
		background-color: var(--color-theme-1);
	}

	.icon {
		width: 0.7rem;
		height: 0.7rem;
	}
	.flex {
		display: flex;
		align-items: baseline;
		gap: 10px;
	}

	button[aria-current='true'] {
		background-color: rgba(8, 255, 82, 0.25);
	}

	.loader {
		width: 24px;
		height: 24px;
		border: 3px solid #252323;
		border-bottom-color: transparent;
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
		text-align: center;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
