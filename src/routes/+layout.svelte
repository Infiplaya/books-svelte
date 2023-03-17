<script lang="ts">
	import Header from './Header.svelte';
	import './styles.css';
	import type { PageData } from './$types'
	export let data: PageData
</script>

<div class="app">
	<Header />
	<ul>
		<form method="POST">
			<li><a href="/">Home</a></li>
			{#if !data.user}
				<li><a href="/register">Register</a></li>
				<li><a href="/login" role="button">Login</a></li>
			{:else}
				<li>
					<button formaction="/logout" type="submit">Logout</button>
				</li>
			{/if}
		</form>
	</ul>

	<main>
		<slot />
	</main>

	<footer>
		<p>Hi</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
