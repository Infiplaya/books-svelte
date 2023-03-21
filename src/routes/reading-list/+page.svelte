
<script lang="ts">
	import type { PageData } from "./$types";
	export let data: PageData;
	import BookCard from "../BookCard.svelte";
	$: ({userLists} = data)
    $: readingList = userLists!.readingList
	$: console.log(readingList)

</script>

<svelte:head>
	<title>Reading list</title>
	<meta name="description" content="Books app" />
</svelte:head>

<section>
 <h1>Reading list</h1>

 <section class="books">
	{#each readingList as book}
	<BookCard book={book} userLists={userLists} isDetailPage={false} />
	{/each}
 </section>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.books {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}


</style>
