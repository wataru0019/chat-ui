<script lang="ts">
	import ChatMessage from './ChatMessage.svelte';
	import Loading from '$lib/components/ui/Loading.svelte';

	let { messages = [], loading = false } = $props();

	// Auto-scroll logic would typically be added here with effects
</script>

<div class="chat-list">
	{#each messages as message}
		<ChatMessage role={message.role} content={message.content} />
	{/each}

	{#if loading}
		<div class="loading-wrapper">
			<div class="loading-avatar">
				<!-- Placeholder for AI avatar alignment -->
			</div>
			<Loading />
		</div>
	{/if}
</div>

<style>
	.chat-list {
		display: flex;
		flex-direction: column;
		padding-bottom: 2rem;
	}

	.loading-wrapper {
		max-width: 48rem;
		margin: 0 auto;
		width: 100%;
		padding: 1rem 0;
		padding-left: 3.5rem; /* avatar width + gap */
	}
</style>
