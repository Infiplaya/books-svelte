<script lang="ts">
	import type { PageData } from './$types';

	export let open = false;

	export let user: PageData['user'];


	function closeNav() {
		open = false;
		toggleScroll();
	}

	function toggleScroll() {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}
</script>

<aside class="sidebar" class:open>
	<nav class="sidebar-nav">
		<a class="link" href="/" on:click={closeNav}>Home</a>
		<a class="link" href="/reading-list" on:click={closeNav}>Reading list</a>
		<a class="link" href="/finished-list" on:click={closeNav}>Finished list</a>
		{#if user}
			<form method="POST" action="?/logout">
				<button class="primary-button">Logout</button>
			</form>
		{:else}
			<a class="link" href="/login" on:click={closeNav}>Login</a>
			<a class="link" href="/register" on:click={closeNav}>Register</a>
		{/if}
	</nav>
</aside>

<style>
	.sidebar {
		position: fixed;
		z-index: 20;
		background-color: var(--color-white);
		width: 100%;
		height: 100%;
		border-right-width: 2px;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}

	.link {
		display: block;
	}

	.sidebar-nav {
		padding: 3rem;
		font-size: 1.25rem;
		line-height: 1.75rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	aside {
		left: -100%;
		transition: left 0.3s ease-in-out;
	}

	.open {
		left: 0;
	}

	@media (min-width: 640px) {
		.sidebar {
			display: none;
		}
	}
</style>
