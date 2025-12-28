// Mock responses for demo purposes
const MOCK_RESPONSES = [
    "That's an interesting perspective! Tell me more.",
    "I can help you build that using SvelteKit. Here's a quick example:\n\n```svelte\n<script>\n  let count = 0;\n</script>\n<button on:click={() => count++}>\n  Clicks: {count}\n</button>\n```",
    "Could you clarify what you mean by that?",
    "## Project Structure\n\n- `src/routes`: Pages\n- `src/lib`: Components and utilities\n- `static`: Public assets",
    "Hello! I am an AI assistant mock. How can I help you today?"
];

export async function mockChatService(message: string): Promise<string> {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            const response = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
            resolve(response);
        }, 1500 + Math.random() * 1000); // 1.5s - 2.5s delay
    });
}
