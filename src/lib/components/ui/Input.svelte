<script lang="ts">
	import { clsx } from 'clsx';

	let { value = $bindable(), class: className = '', ...rest } = $props();
</script>

<input bind:value class={clsx('input', className)} {...rest} />

<style>
	.input {
		display: flex;
		height: 2.5rem;
		width: 100%;
		border-radius: var(--radius);
		border: 1px solid hsl(var(--input));
		background-color: transparent;
		padding: 0.5rem 0.75rem;
		font-size: 0.875rem;
		color: hsl(var(--foreground));
		transition: all 0.2s;
	}

	.input::placeholder {
		color: hsl(var(--muted-foreground));
	}

	.input:focus-visible {
		outline: none;
		border-color: hsl(var(--ring));
		box-shadow: 0 0 0 1px hsl(var(--ring));
	}

	.input:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
</style>
