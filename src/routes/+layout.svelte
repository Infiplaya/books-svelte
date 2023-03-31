<script lang="ts">
	import './styles/styles.css';
	import './styles/fonts.css';
	import Sidebar from '../lib/components/Sidebar.svelte';
	import Header from '../lib/components/Header.svelte';
	import type { PageData } from './$types';
	let open = false;

	export let data: PageData;

	let { user } = data;
</script>

<div class="app">
	<Sidebar bind:open {user} />
	<Header bind:sidebar={open} {user} />
	<main>
		<slot />
	</main>

	<footer>
		<p>Made with love</p>
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
		font-family: 'Alegreya';
		font-weight: 500;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
