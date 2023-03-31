<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import BookCard from '../../lib/components/BookCard.svelte';
	$: ({ userLists, user } = data);
	$: readingList = userLists!.readingList;
</script>

<svelte:head>
	<title>Reading list</title>
	<meta name="description" content="Books app" />
</svelte:head>


	<h1>Reading list</h1>

	<section class="books">
		{#each readingList as book}
			<BookCard {book} {userLists} isDetailPage={false} {user} />
		{/each}
	</section>

<style>

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
