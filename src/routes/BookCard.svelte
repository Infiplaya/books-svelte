<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Book } from '@prisma/client';
	import type { PageData } from "./$types";
	import FaRegBookmark from 'svelte-icons/fa/FaRegBookmark.svelte'
	import FaBookmark from 'svelte-icons/fa/FaBookmark.svelte'
	import FaPlusCircle from 'svelte-icons/fa/FaPlusCircle.svelte'
	import FaCheckCircle from 'svelte-icons/fa/FaCheckCircle.svelte'
	
	export let book: Book;
	export let userLists: PageData['userLists'];
	export let isDetailPage: boolean;
	
	function truncateString(str: string, maxLength: number = 250) {
	  if (str.length > maxLength) {
		return str.slice(0, maxLength - 3) + '...';
	  } else {
		return str;
	  }
	}
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
			<p class="text-sm">{book.description}</p>
			{:else}
			<p class="text-sm">{truncateString(book.description)}</p>
			{/if}
			</a>
	
			<div class="action-buttons">
			{#if userLists?.readingList.map((item) => item.id).includes(book.id)}
				<form action="?/removeFromReadingList" method="POST" use:enhance>
					<input type="hidden" value={book.id} id="id" name="id" />
					<button class="icon" aria-current="true" type="submit" title="Remove from reading list">
						<FaBookmark/>
					</button>
				</form>
			{:else}
				<form action="?/addToReadingList" method="POST" use:enhance>
					<input type="hidden" value={book.id} id="id" name="id" />
						<button class="icon" type="submit" title="Add to reading list">
							<FaRegBookmark />
						</button>
				</form>
			{/if}
			{#if userLists?.finishedList.map((item) => item.id).includes(book.id)}
				<form action="?/removeFromFinishedList" method="POST" use:enhance>
					<input type="hidden" value={book.id} id="id" name="id" />
					<button class="icon" type="submit" aria-current="true" title="Mark as unfinished">
						<FaCheckCircle />
					</button>
				</form>
			{:else}
				<form action="?/addToFinishedList" method="POST" use:enhance>
					<input type="hidden" value={book.id} id="id" name="id" />
					<button class="icon" type="submit" title="Add to finished">
						<FaPlusCircle />
					</button>
				</form>
			{/if}
			</div>
			
		</div>
	
	<style>
	.icon {
		background-color: transparent;
		border: none;
		width: 36px;
		height: 36px;
		cursor: pointer;
		color: var(--color-theme-1);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		transition: all;
		transition-duration: 200ms;
	  }
	  .icon:hover {
		transform: scale(1.2);
	  }

	  .icon[aria-current="true"]{
		color: var(--color-theme-3);
	  }
		.book-card {
			box-shadow: 0px 0px 5px rgb(119, 119, 119);
			background-color: rgb(248, 246, 245);
			padding: 40px;
			border-radius: 20px;
			width: 400px;
			min-height: 150px;
			display: flex;
			flex-direction: column;
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
			align-self: flex-end;
			margin-top: 10px;
			display: flex;
			gap: 10px;
		}
	</style>