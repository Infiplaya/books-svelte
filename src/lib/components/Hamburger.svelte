<script>
	export let open = false;

	function handleOpen() {
		open = !open;
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

<button class="hamburger" class:open on:click={handleOpen}>
	<svg width="32" height="24">
		<line id="top" x1="0" y1="2" x2="32" y2="2" />
		<line id="middle" x1="0" y1="12" x2="24" y2="12" />
		<line id="bottom" x1="0" y1="22" x2="32" y2="22" />
	</svg>
</button>

<style>
	.hamburger {
		margin-right: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 1rem;
		color: var(--color-text);
		border-style: none;
		cursor: pointer;
		background-color: var(--color-white);
		padding: 0.5rem;
	}

	svg {
		min-height: 24px;
		transition: transform 0.3s ease-in-out;
	}

	svg line {
		stroke: currentColor;
		stroke-width: 3;
		transition: transform 0.3s ease-in-out;
	}

	button {
		z-index: 20;
	}

	.open svg {
		transform: scale(0.7);
	}

	.open #top {
		transform: translate(6px, 0px) rotate(45deg);
	}

	.open #middle {
		opacity: 0;
	}

	.open #bottom {
		transform: translate(-12px, 9px) rotate(-45deg);
	}

	@media (min-width: 640px) {
		.hamburger {
			display: none;
		}
	}
</style>
