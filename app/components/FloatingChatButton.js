'use client';
import { useRouter, usePathname } from 'next/navigation';

export default function FloatingChatButton() {
    const router = useRouter();
    const pathname = usePathname();

    // Don't show button on chat page itself
    if (pathname === '/chat') {
        return null;
    }

    return (
        <button
            className="floating-chat-button pulse"
            onClick={() => router.push('/chat')}
            aria-label="Open AI Support Chat"
        >
            💬
        </button>
    );
}
