<script lang="ts">
	import { clsx } from 'clsx';

	let { variant = 'primary', size = 'md', class: className = '', children, ...rest } = $props();
</script>

<button class={clsx('btn', `btn-${variant}`, `btn-${size}`, className)} {...rest}>
	{@render children?.()}
</button>

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius);
		font-weight: 500;
		transition: all 0.2s;
		cursor: pointer;
		border: 1px solid transparent;
		font-family: inherit;
		font-size: 0.875rem;
		line-height: 1.25rem;
		white-space: nowrap;
		text-decoration: none;
	}

	.btn:disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	.btn:focus-visible {
		outline: 2px solid hsl(var(--ring));
		outline-offset: 2px;
	}

	/* Variants */
	.btn-primary {
		background-color: hsl(var(--primary));
		color: hsl(var(--primary-foreground));
	}
	.btn-primary:hover {
		opacity: 0.9;
	}

	.btn-secondary {
		background-color: hsl(var(--secondary));
		color: hsl(var(--secondary-foreground));
	}
	.btn-secondary:hover {
		opacity: 0.8;
	}

	.btn-ghost {
		background-color: transparent;
		color: hsl(var(--foreground));
	}
	.btn-ghost:hover {
		background-color: hsl(var(--accent));
		color: hsl(var(--accent-foreground));
	}

	.btn-outline {
		background-color: transparent;
		border-color: hsl(var(--input));
		color: hsl(var(--foreground));
	}
	.btn-outline:hover {
		background-color: hsl(var(--accent));
		color: hsl(var(--accent-foreground));
	}

	.btn-destructive {
		background-color: hsl(var(--destructive));
		color: hsl(var(--destructive-foreground));
	}
	.btn-destructive:hover {
		opacity: 0.9;
	}

	/* Sizes */
	.btn-sm {
		height: 2rem;
		padding: 0 0.75rem;
		font-size: 0.75rem;
	}
	.btn-md {
		height: 2.5rem;
		padding: 0 1rem;
	}
	.btn-lg {
		height: 3rem;
		padding: 0 2rem;
	}
	.btn-icon {
		height: 2.5rem;
		width: 2.5rem;
		padding: 0;
	}
</style>
