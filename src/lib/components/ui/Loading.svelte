<script lang="ts">
	import { clsx } from 'clsx';
	let { class: className = '' } = $props();
</script>

<div class={clsx('typing-indicator', className)}>
	<span></span>
	<span></span>
	<span></span>
</div>

<style>
	.typing-indicator {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.typing-indicator span {
		display: block;
		height: 0.5rem;
		width: 0.5rem;
		border-radius: 50%;
		background-color: hsl(var(--muted-foreground));
		opacity: 0.5;
		animation: bounce 1.4s infinite ease-in-out both;
	}

	.typing-indicator span:nth-child(1) {
		animation-delay: -0.32s;
	}
	.typing-indicator span:nth-child(2) {
		animation-delay: -0.16s;
	}

	@keyframes bounce {
		0%,
		80%,
		100% {
			transform: scale(0);
		}
		40% {
			transform: scale(1);
		}
	}
</style>
