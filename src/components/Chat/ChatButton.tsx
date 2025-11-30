// src/components/Chat/ChatButton.tsx
import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { MessageCircle } from 'lucide-react';
import ChatDialog from './ChatDialog';
import '../../styles/chat.css';

const ChatButton: React.FC = () => {
    return (
        <div className="chat-button-container">
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button
                        className="chat-button"
                        aria-label="채팅 시작하기"
                    >
                        <MessageCircle size={24} />
                    </button>
                </Dialog.Trigger>
                <ChatDialog />
            </Dialog.Root>
        </div>
    );
};

export default ChatButton;
