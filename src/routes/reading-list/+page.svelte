
<script lang="ts">
	import type { PageData } from "./$types";
	export let data: PageData;
	import { enhance } from '$app/forms';
	$: ({userLists} = data)
    $: readingList = userLists!.readingList

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Books app" />
</svelte:head>

<section>
 <h1>Hello, world</h1>

 <section class="books">
	{#each readingList as book}
	<div class="book-card">
		<h2>{book.title}</h2>
		<div>{book.author}</div>
		<div>{book.description}</div>
		{#if userLists?.readingList.map((item) => item.id).includes(book.id)}
		<form action="?/removeFromReadingList" method="POST" use:enhance>
			<input type="hidden" value={book.id} id="id" name="id" />
			<button type="submit">
				Remove from readlist
			</button>
		</form>
		{:else}
		<form action="?/addToReadingList" method="POST" use:enhance>
			<input type="hidden" value={book.id} id="id" name="id" />
			<button type="submit">
				Add to reading list
			</button>
		</form>
		{/if}
	</div>
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

	h2 {
		font-size: 28px;
	}

	.book-form {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.books {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.book-card {
		background-color: aquamarine;
		padding: 40px;
		border-radius: 20px;
		width: 200px;
		min-height: 150px;
	}

	textarea {
		min-height: 200px;
		min-width: 350px;
	}

</style>
