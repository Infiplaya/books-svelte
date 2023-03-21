<script lang="ts">
	import type { PageData } from "./$types";
	export let data: PageData;
	import BookCard from "../../BookCard.svelte";
	$: ({book, userLists} = data)

</script>

<svelte:head>
	<title>{book.title}</title>
	<meta name="description" content="Books app" />
</svelte:head>

<section class="books">
	<BookCard book={book} userLists={userLists}/>
 </section>


 <style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	.books {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}


</style>