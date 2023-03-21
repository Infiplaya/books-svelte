<script lang="ts">
import { enhance } from '$app/forms';
import type { Book } from '@prisma/client';
import type { PageData } from "./$types";
export let book: Book;
export let userLists: PageData['userLists'];
export let isDetailPage: boolean;
</script>

	<div class="book-card">
        <a href="/books/{book.id}">
		<div class="card-grid">
			<img src="{book.image}" alt="{book.title}" width="200" class="book-img">
			<div class="title">
				<h2>{book.title}</h2>
				<p>{book.author}</p>
			</div>
		</div>
		{#if isDetailPage}
		<p class="description">{book.description}</p>
		{/if}
        </a>

		<div class="action-buttons">
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

	.description {
		font-size: 0.875rem; 
		line-height: 1.25rem; 
	}

	.card-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 40px;
	}

	.book-img {
		align-self: center;
	}
	
	h2 {
		font-size: 28px;
	}

	.title {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.action-buttons {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

</style>