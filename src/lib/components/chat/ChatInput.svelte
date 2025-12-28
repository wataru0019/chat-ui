<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { SendHorizontal } from 'lucide-svelte';

	let { value = $bindable(), disabled = false, onsubmit } = $props();

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			if (!disabled && value.trim()) {
				onsubmit?.();
			}
		}
	}

	function handleSubmit() {
		if (!disabled && value.trim()) {
			onsubmit?.();
		}
	}

	// Auto-resize logic could go here or use a library,
	// currently simple textarea
</script>

<div class="chat-input-container">
	<div class="chat-input-wrapper">
		<textarea
			bind:value
			placeholder="Type a message..."
			class="chat-textarea"
			rows="1"
			{disabled}
			onkeydown={handleKeydown}
		></textarea>

		<Button
			size="icon"
			variant="ghost"
			class="send-button"
			disabled={disabled || !value?.trim()}
			onclick={handleSubmit}
			aria-label="Send message"
		>
			<SendHorizontal size={20} />
		</Button>
	</div>
	<div class="footer-text">AI can make mistakes. Consider checking important information.</div>
</div>

<style>
	.chat-input-container {
		width: 100%;
		max-width: 48rem;
		margin: 0 auto;
		padding: 1rem;
		background-color: hsl(var(--background));
	}

	.chat-input-wrapper {
		position: relative;
		display: flex;
		align-items: flex-end;
		gap: 0.5rem;
		padding: 0.75rem;
		border-radius: 1rem;
		border: 1px solid hsl(var(--border));
		background-color: hsl(var(--background));
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
		transition: border-color 0.2s;
	}

	.chat-input-wrapper:focus-within {
		border-color: hsl(var(--ring));
	}

	.chat-textarea {
		flex: 1;
		max-height: 200px;
		min-height: 24px;
		background: transparent;
		border: none;
		resize: none;
		padding: 0.25rem 0.5rem;
		font-family: inherit;
		font-size: 1rem;
		line-height: 1.5;
		color: hsl(var(--foreground));
	}

	.chat-textarea:focus {
		outline: none;
	}

	.footer-text {
		text-align: center;
		font-size: 0.75rem;
		color: hsl(var(--muted-foreground));
		margin-top: 0.75rem;
	}

	/* Global class overrides for button if needed */
	:global(.send-button) {
		margin-bottom: 0.125rem;
	}
	:global(.send-button:hover) {
		background-color: hsl(var(--secondary));
	}
</style>
