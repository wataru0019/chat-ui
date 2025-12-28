<script lang="ts">
	import { onMount, tick } from 'svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import ChatList from '$lib/components/chat/ChatList.svelte';
	import ChatInput from '$lib/components/chat/ChatInput.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { Menu } from 'lucide-svelte';
	import { chatStore } from '$lib/stores/chatStore';
	import { mockChatService } from '$lib/services/mockService';

	let input = $state('');
	let isSidebarOpen = $state(true); // Default open on desktop
	let scrollContainer: HTMLDivElement;

	// Subscribe to store
	// In Svelte 5, we can use $store directly in template, or derive it.
	// Using auto-subscription $chatStore in template.

	function scrollToBottom() {
		if (scrollContainer) {
			// Timeout to allow DOM update
			setTimeout(() => {
				scrollContainer.scrollTop = scrollContainer.scrollHeight;
			}, 0);
		}
	}

	// Effect to scroll on new messages
	$effect(() => {
		if ($chatStore.messages.length) {
			scrollToBottom();
		}
	});

	async function handleSubmit() {
		if (!input.trim() || $chatStore.isLoading) return;

		const userMessage = input;
		input = ''; // Clear input immediately

		// Add user message
		chatStore.addMessage('user', userMessage);
		chatStore.setLoading(true);
		scrollToBottom();

		try {
			// Get mock response
			const response = await mockChatService(userMessage);
			chatStore.addMessage('assistant', response);
		} catch (error) {
			console.error('Failed to get response', error);
			chatStore.addMessage('assistant', 'Sorry, I encountered an error.');
		} finally {
			chatStore.setLoading(false);
			scrollToBottom();
		}
	}
</script>

<div class="app-layout">
	<!-- Desktop Sidebar / Mobile Drawer -->
	<Sidebar bind:isOpen={isSidebarOpen} />

	<main class="main-content" class:sidebar-open={isSidebarOpen}>
		<!-- Top Bar (Mobile trigger) -->
		<header class="top-bar">
			{#if !isSidebarOpen}
				<Button variant="ghost" size="icon" onclick={() => (isSidebarOpen = true)}>
					<Menu size={20} />
				</Button>
			{:else}
				<!-- Spacer to balance layout if needed, or just empty -->
				<div class="w-10"></div>
			{/if}
			<h1 class="header-title">New Chat</h1>
			<div class="w-10"></div>
			<!-- Spacer for centering -->
		</header>

		<!-- Chat Area -->
		<div class="chat-area" bind:this={scrollContainer}>
			<div class="chat-container">
				{#if $chatStore.messages.length === 0}
					<div class="empty-state">
						<h2 class="text-2xl font-bold mb-2">How can I help you today?</h2>
						<p class="text-muted-foreground">Start a conversation with the AI assistant.</p>
					</div>
				{:else}
					<ChatList messages={$chatStore.messages} loading={$chatStore.isLoading} />
				{/if}
			</div>
		</div>

		<!-- Input Area -->
		<div class="input-area">
			<ChatInput bind:value={input} disabled={$chatStore.isLoading} onsubmit={handleSubmit} />
		</div>
	</main>
</div>

<style>
	.app-layout {
		display: flex;
		height: 100vh;
		width: 100vw;
		overflow: hidden;
		background-color: hsl(var(--background));
	}

	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		height: 100%;
		transition: margin-left 0.3s ease;
		position: relative;
		width: 100%;
	}

	/* Adjust main content when sidebar is open on desktop */
	@media (min-width: 769px) {
		.sidebar-open {
			margin-left: 260px; /* Sidebar width */
		}
	}

	.top-bar {
		height: 3.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1rem;
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.header-title {
		font-weight: 600;
		font-size: 1rem;
	}

	.chat-area {
		flex: 1;
		overflow-y: auto;
		padding: 1rem;
		display: flex;
		flex-direction: column;
	}

	.chat-container {
		flex: 1;
		width: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}

	.empty-state {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding-bottom: 4rem;
		color: hsl(var(--foreground));
	}

	.input-area {
		padding-bottom: 1rem;
		background: linear-gradient(to bottom, transparent, hsl(var(--background)) 20%);
	}
</style>
