<script lang="ts">
import { enhance } from '$app/forms';
import type { Book } from '@prisma/client';
import type { PageData } from "./$types";
export let book: Book;
export let userLists: PageData['userLists'];
</script>

	<div class="book-card">
        <a href="/books/{book.id}">
		<img src="{book.image}" alt="{book.title}" width="200" class="book-img">
		<h2>{book.title}</h2>
		<div>{book.author}</div>
		<div>{book.description}</div>
        </a>
		{#if userLists?.finishedList.map((item) => item.id).includes(book.id)}
		<form action="?/removeFromFinishedList" method="POST" use:enhance>
			<input type="hidden" value={book.id} id="id" name="id" />
			<button type="submit">
				Mark as unfinished
			</button>
		</form>
		{:else}
		<form action="?/addToFinishedList" method="POST" use:enhance>
			<input type="hidden" value={book.id} id="id" name="id" />
			<button type="submit">
				Mark as finished
			</button>
		</form>
		{/if}
		{#if userLists?.readingList.map((item) => item.id).includes(book.id)}
		<form action="?/removeFromReadingList" method="POST" use:enhance>
			<input type="hidden" value={book.id} id="id" name="id" />
			<button type="submit">
				Remove from reading list
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

<style>
    .book-card {
		background-color: aquamarine;
		padding: 40px;
		border-radius: 20px;
		width: 400px;
		min-height: 150px;
		display: flex;
		flex-direction: column;
	}

	.book-img {
		align-self: center;
	}

    h1 {
		width: 100%;
	}

	h2 {
		font-size: 28px;
	}

</style>