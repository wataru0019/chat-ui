<script lang="ts">
	import { clsx } from 'clsx';

	let {
		src = undefined,
		fallback = undefined,
		alt = '',
		size = 'md',
		class: className = '',
		...rest
	} = $props();
</script>

<div class={clsx('avatar', `avatar-${size}`, className)} {...rest}>
	{#if src}
		<img {src} {alt} class="avatar-image" />
	{:else}
		<div class="avatar-fallback">{fallback}</div>
	{/if}
</div>

<style>
	.avatar {
		position: relative;
		display: flex;
		flex-shrink: 0;
		overflow: hidden;
		border-radius: 9999px;
		background-color: hsl(var(--muted));
	}

	.avatar-image {
		aspect-ratio: 1 / 1;
		height: 100%;
		width: 100%;
		object-fit: cover;
	}

	.avatar-fallback {
		display: flex;
		height: 100%;
		width: 100%;
		align-items: center;
		justify-content: center;
		background-color: hsl(var(--muted));
		color: hsl(var(--muted-foreground));
		font-size: 0.875rem;
		font-weight: 500;
		text-transform: uppercase;
	}

	/* Sizes */
	.avatar-sm {
		height: 2rem;
		width: 2rem;
	}
	.avatar-md {
		height: 2.5rem;
		width: 2.5rem;
	}
	.avatar-lg {
		height: 3rem;
		width: 3rem;
	}
</style>
