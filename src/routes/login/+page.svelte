<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	export let form;

	let message: string;
	$: message = $page.url.searchParams.get('message') ?? '';
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Books app" />
</svelte:head>

<section class="login">
	{#if message}
		<p class="alert">{message}</p>
	{/if}
	<form method="POST" use:enhance>
		<hgroup>
			<h1>Login</h1>
		</hgroup>
		<label for="username">Username</label>
		<input type="text" id="username" name="username" required />

		<label for="password">Password</label>
		<input type="password" id="password" name="password" required />

		<button type="submit" class="primary-button">Login</button>
		{#if form?.message}
			<p class="error">{form.message}</p>
		{/if}
	</form>
	<p>Don't have an account? <a href="/register">Register</a></p>
</section>

<style>
	.alert {
		background-color: rgba(255, 0, 0, 0.5);
		padding: 1rem 3rem;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 4rem;
	}
	.login {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;
	}
	form {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.error {
		color: var(--color-theme-2);
		font-size: 1rem;
	}

	input,
	hgroup {
		margin-bottom: 1.2rem;
	}

	input {
		padding: 5px 10px;
		font-weight: 500;
		font-size: 1.1rem;
	}

	input:focus {
		outline-color: var(--color-theme-2);
	}

	label {
		margin-bottom: 0.6rem;
		font-size: 1.2rem;
	}

	p {
		font-size: 1.1rem;
	}

	h1 {
		font-size: 2.5rem;
	}

	a {
		color: var(--color-theme-2);
	}

	a:hover {
		text-decoration-line: underline;
		text-underline-offset: 4px;
	}
</style>
