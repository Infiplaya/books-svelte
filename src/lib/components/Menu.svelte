<script lang="ts">
	import type { PageData } from '../../routes/$types';
	import { page } from '$app/stores';

	export let user: PageData['user'];
</script>

<nav class="menu text-sm">
	<a class="link" href="/" aria-current={$page.url.pathname === '/' ? 'page' : undefined}>Home</a>
	<a
		class="link"
		href="/library"
		aria-current={$page.url.pathname === '/library' ? 'page' : undefined}>My Library</a
	>
	{#if user}
		<form method="POST" action="/logout">
			<button class="primary-button">Logout</button>
		</form>
	{:else}
		<a
			class="link"
			href="/login"
			aria-current={$page.url.pathname === '/login' ? 'page' : undefined}>Login</a
		>
		<a
			class="link"
			href="/register"
			aria-current={$page.url.pathname === '/register' ? 'page' : undefined}>Register</a
		>
	{/if}
</nav>

<style>
	.link:hover {
		color: #374151;
	}

	.link[aria-current='page'] {
		text-decoration: wavy;
		text-decoration-line: underline;
		text-decoration-thickness: 2px;
		text-underline-offset: 4px;
		color: var(--color-theme-3);
	}

	.menu {
		display: none;
		color: var(--color-text);
		text-transform: uppercase;
	}

	@media (min-width: 640px) {
		.menu {
			display: flex;
			background-color: var(--color-white);
			padding: 0.7rem 1.7rem;
			align-items: center;
			gap: 1rem;
			font-weight: 500;
		}
	}
</style>
