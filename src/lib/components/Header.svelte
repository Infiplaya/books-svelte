<script lang="ts">
	import type { PageData } from '../../routes/$types';
	import Hamburger from './Hamburger.svelte';
	import Menu from './Menu.svelte';

	export let user: PageData['user'];

	export let sidebar = false;
</script>

<header class="header">
	<nav class="navbar">
		<Hamburger bind:open={sidebar} />
	</nav>

	<Menu {user} />
</header>

<style>
	.header {
		display: flex;
		padding: 0.5rem;
		justify-content: flex-end;
		align-items: center;
		border-bottom-width: 2px;
	}

	.navbar {
		display: flex;
	}

	@media (min-width: 640px) {
		.header {
			justify-content: center;
		}
	}
</style>
