import { writable } from 'svelte/store';

export type UserRole = 'user' | 'assistant';

export interface Message {
    role: UserRole;
    content: string;
}

function createChatStore() {
    const { subscribe, update, set } = writable<{
        messages: Message[];
        isLoading: boolean;
    }>({
        messages: [],
        isLoading: false,
    });

    return {
        subscribe,
        addMessage: (role: UserRole, content: string) => {
            update((state) => ({
                ...state,
                messages: [...state.messages, { role, content }],
            }));
        },
        setLoading: (loading: boolean) => {
            update((state) => ({ ...state, isLoading: loading }));
        },
        reset: () => {
            set({ messages: [], isLoading: false });
        }
    };
}

export const chatStore = createChatStore();
