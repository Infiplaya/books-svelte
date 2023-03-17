<script lang="ts">
	import type {PageData} from "./$types";
	export let data: PageData;

	$: ({books} = data);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
 <h1>Hello, world</h1>

 <section>
	{#each books as book}
	<p>{book.title}</p>
	<p>{book.author}</p>
	{/each}
 </section>

 <form action="?/createBook" method="POST">
	<h3>New book</h3>
	<input type="text" id="title" name="title" />

	<input type="text" id="author" name="author" />

	<button type="submit">Add book</button>
</form>
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

</style>
