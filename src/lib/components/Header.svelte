<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from '../../routes/$types';
	import { fly } from 'svelte/transition';
	import Hamburger from './Hamburger.svelte';
	export let data: PageData;
	let open = false;
	let onClick = (): void => {
		open = !open;
		if (open) {
			document.body.style.overflowY = 'hidden';
		} else {
			document.body.style.overflowY = 'visible';
		}
	};

	function hideNav() {
		open = false;
	}
</script>

<header>
	<div class="mobile-menu">
		<Hamburger {open} {onClick} />
	</div>

	{#if open}
		<nav transition:fly={{ y: -200, duration: 400 }} class="mobile-nav">
			<a href="/" on:click={hideNav}>Home</a>
			<a href="/reading-list" on:click={hideNav}>Reading list</a>
			<a href="/finished-list" on:click={hideNav}>Finished list</a>
			{#if !data.user}
				<a href="/register" on:click={hideNav}>Register</a>
				<a href="/login" role="button" on:click={hideNav}>Login</a>
			{:else}
				<form method="POST" class="auth">
					<button
						formaction="/logout"
						type="submit"
						class="primary-button text-sm"
						on:click={hideNav}>Logout</button
					>
				</form>
			{/if}
		</nav>
	{/if}

	<nav class="desktop-nav">
		<ul class="desktop">
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/reading-list' ? 'page' : undefined}>
				<a href="/reading-list">Reading list</a>
			</li>
			<li aria-current={$page.url.pathname === '/finished-list' ? 'page' : undefined}>
				<a href="/finished-list">Finished list</a>
			</li>

			{#if !data.user}
				<li aria-current={$page.url.pathname === '/register' ? 'page' : undefined}>
					<a href="/register">Register</a>
				</li>
				<li aria-current={$page.url.pathname === '/login' ? 'page' : undefined}>
					<a href="/login" role="button">Login</a>
				</li>
			{:else}
				<form method="POST" class="auth">
					<li>
						<button formaction="/logout" type="submit" class="primary-button text-sm">Logout</button
						>
					</li>
				</form>
			{/if}
		</ul>
	</nav>
</header>

<style>
	header {
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.desktop-nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	.mobile-menu {
		display: flex;
		justify-content: flex-end;
	}

	.mobile-nav {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: white;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		gap: 20px;
		padding: 40px 0px;
	}

	.mobile-nav a {
		font-size: 1.8rem;
	}

	.desktop {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
		padding-inline: 20px;
		gap: 20px;
		display: none;
	}

	.desktop > li {
		position: relative;
		height: 100%;
	}

	.desktop > li[aria-current='page'] {
		text-decoration: wavy;
		text-decoration-line: underline;
		text-decoration-thickness: 2px;
		text-underline-offset: 4px;
		color: var(--color-theme-1);
	}

	.desktop-nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}

	@media (min-width: 680px) {

		header {
			margin-top: 28px;
		}
		.desktop {
			display: flex;
		}

		.mobile-menu,
		.mobile-nav {
			display: none;
		}
	}
</style>
