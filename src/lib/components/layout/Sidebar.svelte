<script lang="ts">
	import { clsx } from 'clsx';
	import Button from '$lib/components/ui/Button.svelte';
	import { Plus, MessageSquare, PanelLeftClose, PanelLeftOpen } from 'lucide-svelte';

	let { isOpen = $bindable(true), class: className = '' } = $props();

	// Mock history data
	const history = [
		{ id: 1, title: 'Previous Chat 1' },
		{ id: 2, title: 'SvelteKit Implementation' },
		{ id: 3, title: 'Component Design' }
	];
</script>

<aside class={clsx('sidebar', !isOpen && 'sidebar-closed', className)}>
	<div class="sidebar-header">
		<Button variant="outline" class="new-chat-btn w-full justify-start gap-2">
			<Plus size={16} />
			<span>New Chat</span>
		</Button>

		<Button
			variant="ghost"
			size="icon"
			class="toggle-btn"
			onclick={() => (isOpen = !isOpen)}
			aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
		>
			{#if isOpen}
				<PanelLeftClose size={20} />
			{:else}
				<PanelLeftOpen size={20} />
			{/if}
		</Button>
	</div>

	<div class="sidebar-content">
		<div class="history-list">
			{#each history as chat}
				<Button variant="ghost" class="history-item justify-start gap-2 w-full font-normal">
					<MessageSquare size={16} class="shrink-0" />
					<span class="truncate">{chat.title}</span>
				</Button>
			{/each}
		</div>
	</div>

	<div class="sidebar-footer">
		<div class="user-profile">
			<!-- User profile info could go here -->
		</div>
	</div>
</aside>

<!-- Mobile Overlay -->
{#if isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="mobile-overlay" onclick={() => (isOpen = false)}></div>
{/if}

<style>
	.sidebar {
		display: flex;
		flex-direction: column;
		width: 260px;
		height: 100vh;
		background-color: hsl(var(--muted)); /* or a specific sidebar color */
		border-right: 1px solid hsl(var(--border));
		transition:
			width 0.3s ease,
			transform 0.3s ease;
		z-index: 20;
		position: fixed;
		top: 0;
		left: 0;
	}

	.sidebar-closed {
		width: 0;
		transform: translateX(-100%);
		overflow: hidden;
	}

	/* On larger screens, "closed" might just mean collapsed width or hidden, 
     but keeping it simple: sliding off-canvas styled behavior */

	.sidebar-header {
		padding: 0.875rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.new-chat-btn {
		flex: 1;
		overflow: hidden;
	}

	/* toggle-btn styling moved or unused */

	.sidebar-content {
		flex: 1;
		overflow-y: auto;
		padding: 0 0.5rem;
	}

	.history-list {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.history-item {
		color: hsl(var(--muted-foreground));
	}

	/* Utility classes to support the attributes used in components */
	:global(.history-item.gap-2),
	:global(.new-chat-btn.gap-2) {
		gap: 0.75rem;
	}

	:global(.justify-start) {
		justify-content: flex-start !important;
	}

	:global(.w-full) {
		width: 100% !important;
	}

	:global(.font-normal) {
		font-weight: 400 !important;
	}
	.history-item:hover {
		color: hsl(var(--foreground));
		background-color: hsl(var(--accent)); /* Slightly darker/lighter */
	}
	.shrink-0 {
		flex-shrink: 0;
	}

	.sidebar-footer {
		padding: 1rem;
		border-top: 1px solid hsl(var(--border));
	}

	.mobile-overlay {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 10;
		display: none;
	}

	@media (max-width: 768px) {
		.sidebar {
			transform: translateX(-100%);
		}
		/* sidebar-closed state handled by transform */
		.sidebar:not(.sidebar-closed) {
			transform: translateX(0);
		}

		.mobile-overlay {
			display: block;
		}
	}
</style>
