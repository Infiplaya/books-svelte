<section class="register">
	<form method="POST">
		<hgroup>
			<h1>Register</h1>
		</hgroup>
	
		
		<label for="username">Username</label>
		<input type="text" id="username" name="username" required />
	
		<label for="password">Password</label>
		<input type="password" id="password" name="password" required />
	
		<button type="submit" class="primary-button">Register</button>
	</form>
	<p>Already have an account? <a href="/login">Login</a></p>
	
</section>


<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	input, hgroup {
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

	h1 {
		font-size: 2.5rem;
	}


	.register {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;
	}

	p {
		font-size: 1.1rem;
	}

	a {
		color: var(--color-theme-2);
	}


	a:hover {
		text-decoration-line: underline;
		text-underline-offset: 4px;
	}
</style>