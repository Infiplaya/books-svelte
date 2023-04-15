<script lang="ts">
	type Mode = 'favorites' | 'wantToRead' | 'finished' | 'justReading';
	export let data: PageData;
	import BookCard from '../../lib/components/BookCard.svelte';
	import type { PageData } from './$types.js';
	$: ({ userLists } = data);

	let mode: Mode = 'wantToRead';

	export let form;
</script>

<svelte:head>
	<title>My library</title>
	<meta name="description" content="Books app" />
</svelte:head>

<h1>My library</h1>

<div class="grid">
	<div class="mode-list">
		<h3>Select mode</h3>
		<div class="buttons">
			<button
				on:click={() => (mode = 'favorites')}
				class={mode === 'favorites' ? 'selected primary-button' : 'primary-button'}
				>Favorites</button
			>
			<button
				on:click={() => (mode = 'justReading')}
				class={mode === 'justReading' ? 'selected primary-button' : 'primary-button'}
				>Just reading</button
			>
			<button
				on:click={() => (mode = 'wantToRead')}
				class={mode === 'wantToRead' ? 'selected primary-button' : 'primary-button'}
				>Want To Read</button
			>
			<button
				on:click={() => (mode = 'finished')}
				class={mode === 'finished' ? 'selected primary-button' : 'primary-button'}>Finished</button
			>
		</div>
	</div>

	<section class="books">
		{#if userLists}
			{#if mode === 'wantToRead'}
				{#each userLists.wantToRead as book}
					<BookCard {book} {userLists} {form} />
				{/each}
			{:else if mode === 'justReading'}
				{#each userLists.justReading as book}
					<BookCard {book} {userLists} {form} />
				{/each}
			{:else if mode === 'favorites'}
				{#each userLists.favorites as book}
					<BookCard {book} {userLists} {form} />
				{/each}
			{:else if mode === 'finished'}
				{#each userLists.finishedList as book}
					<BookCard {book} {userLists} {form} />
				{/each}
			{/if}
		{/if}
	</section>
</div>

<style>
	.grid {
		display: flex;
		flex-direction: column;
	}

	.mode-list {
		margin-bottom: 2rem;
	}

	.books {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}



	.buttons {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 10px;
		margin-top: 1rem;
	}

	h1 {
		margin: 20px 0px;
	}

	h3 {
		text-align: center;
	}

	.selected {
		background-color: #409d69;
		color: #f8f7f7;
	}

	@media (min-width: 720px) {
		.grid {
			display: grid;
			grid-template-columns: repeat(12, 1fr);
		}

		.books {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			gap: 40px;
			grid-column: span 6 / span 6;
		}

		.mode-list {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 10px;
			grid-column: span 3 / span 3;
		}

		.buttons {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 10px;
		}

		button {
			width: 10rem;
		}
	}
</style>
