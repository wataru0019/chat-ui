<script lang="ts">
	import { marked } from 'marked';
	import { clsx } from 'clsx';
	import Avatar from '$lib/components/ui/Avatar.svelte';

	let { role = 'user', content = '', class: className = '' } = $props();

	let htmlContent = $derived(marked.parse(content));
</script>

<div class={clsx('message', `message-${role}`, className)}>
	<div class="message-avatar">
		<Avatar
			fallback={role === 'user' ? 'U' : 'AI'}
			class={role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}
		/>
	</div>

	<div class="message-content-wrapper">
		<div class="message-name">
			{role === 'user' ? 'You' : 'AI Assistant'}
		</div>

		<div class="message-bubble prose">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html htmlContent}
		</div>
	</div>
</div>

<style>
	.message {
		display: flex;
		gap: 1rem;
		padding: 1.5rem 0;
		max-width: 48rem; /* max-w-3xl */
		margin: 0 auto;
		width: 100%;
	}

	.message-avatar {
		flex-shrink: 0;
		margin-top: 0.125rem;
	}

	.message-content-wrapper {
		flex: 1;
		min-width: 0;
	}

	.message-name {
		font-size: 0.875rem;
		font-weight: 600;
		margin-bottom: 0.25rem;
		color: hsl(var(--foreground));
	}

	.message-bubble {
		color: hsl(var(--foreground));
		line-height: 1.625;
	}

	/* Markdown styling styles (prose-like) */
	.message-bubble :global(p) {
		margin-bottom: 1em;
	}
	.message-bubble :global(p:last-child) {
		margin-bottom: 0;
	}
	.message-bubble :global(pre) {
		background-color: hsl(var(--muted));
		padding: 1rem;
		border-radius: var(--radius);
		overflow-x: auto;
		font-family: monospace;
		margin: 1em 0;
	}
	.message-bubble :global(code) {
		background-color: hsl(var(--muted));
		padding: 0.2em 0.4em;
		border-radius: 0.25rem;
		font-family: monospace;
		font-size: 0.875em;
	}
	.message-bubble :global(ul),
	.message-bubble :global(ol) {
		padding-left: 1.5em;
		margin: 1em 0;
	}
	.message-bubble :global(li) {
		margin-bottom: 0.5em;
	}
	.message-bubble :global(a) {
		color: hsl(var(--primary));
		text-decoration: underline;
		text-underline-offset: 4px;
	}
</style>
