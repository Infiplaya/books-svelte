
<script lang="ts">
	import type { PageData } from "./$types";
	export let data: PageData;
	import BookCard from "../BookCard.svelte";
	$: ({userLists} = data)
    $: finishedList = userLists!.finishedList

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Books app" />
</svelte:head>

<section>
	<h1>Finished list</h1>
 <section class="books">
	{#each finishedList as book}
	<BookCard book={book} userLists={userLists} isDetailPage={false}/>
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
		font-family: 'Handlee';
	 }


	.books {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}


</style>
