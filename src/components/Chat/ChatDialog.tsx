// src/components/Chat/ChatDialog.tsx
import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { sendChatMessage } from '../../lib/chat';
import { MainScreen } from './MainScreen';
import { ChatScreen } from './ChatScreen';
import '../../styles/chat.css';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    isTyping?: boolean;
    timestamp: Date;
}

interface ChatHistory {
    id: string;
    lastMessage: string;
    timestamp: Date;
    messages: Message[];
}

const ChatDialog: React.FC = () => {
    const [currentScreen, setCurrentScreen] = React.useState<'main' | 'chat'>('main');
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [chatHistories, setChatHistories] = React.useState<ChatHistory[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [typingMessageIndex, setTypingMessageIndex] = React.useState<number | null>(null);
    const [displayedContent, setDisplayedContent] = React.useState<string>('');

    // Load chat history from localStorage on component mount
    React.useEffect(() => {
        try {
            const savedHistories = localStorage.getItem('rionco-chat-histories');
            if (savedHistories) {
                const parsedHistories = JSON.parse(savedHistories);
                // Convert timestamp strings back to Date objects and ensure messages field exists
                const historiesWithDates = parsedHistories.map((history: any) => ({
                    ...history,
                    timestamp: new Date(history.timestamp),
                    messages: history.messages || [] // Ensure messages field exists for backward compatibility
                }));
                setChatHistories(historiesWithDates);
            }
        } catch (error) {
            console.error('Error loading chat history from localStorage:', error);
        }
    }, []);

    // Save chat history to localStorage whenever it changes
    React.useEffect(() => {
        try {
            if (chatHistories.length > 0) {
                localStorage.setItem('rionco-chat-histories', JSON.stringify(chatHistories));
            }
        } catch (error) {
            console.error('Error saving chat history to localStorage:', error);
        }
    }, [chatHistories]);

    // Typing effect for assistant messages
    React.useEffect(() => {
        if (typingMessageIndex !== null) {
            const message = messages[typingMessageIndex];
            if (message && message.role === 'assistant' && message.isTyping) {
                const fullContent = message.content;
                let currentIndex = 0;

                const typeInterval = setInterval(() => {
                    if (currentIndex <= fullContent.length) {
                        setDisplayedContent(fullContent.slice(0, currentIndex));
                        currentIndex++;
                    } else {
                        clearInterval(typeInterval);
                        // Mark typing as complete
                        setMessages(prev => prev.map((msg, idx) => 
                            idx === typingMessageIndex 
                                ? { ...msg, isTyping: false }
                                : msg
                        ));
                        setTypingMessageIndex(null);
                        setDisplayedContent('');
                    }
                }, 30); // Typing speed: 30ms per character

                return () => clearInterval(typeInterval);
            }
        }
    }, [typingMessageIndex, messages]);

    const startChat = (initialMessage?: string, historyId?: string) => {
        setCurrentScreen('chat');

        // If historyId is provided, load the previous conversation
        if (historyId) {
            const history = chatHistories.find(h => h.id === historyId);
            if (history && history.messages) {
                // Convert timestamp strings back to Date objects for loaded messages
                const messagesWithDates = history.messages.map(msg => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp),
                    isTyping: false // Ensure no typing animation for loaded messages
                }));
                setMessages(messagesWithDates);
                return;
            }
        }

        // Default behavior: start new chat
        const greeting: Message = {
            role: 'assistant',
            content: '안녕하세요! 리온코의 채팅봇입니다. 시스템 개발 및 홈페이지 구축에 관한 문의사항이 있으시면 언제든지 말씀해 주세요.',
            timestamp: new Date(),
        };
        setMessages([greeting]);
        if (initialMessage) {
            setTimeout(() => {
                handleSendMessage(initialMessage);
            }, 500);
        }
    };

    const endChat = () => {
        if (messages.length > 1) {
            const lastUserMessage = messages.filter(m => m.role === 'user').pop();
            if (lastUserMessage) {
                const newHistory: ChatHistory = {
                    id: Date.now().toString(),
                    lastMessage: lastUserMessage.content,
                    timestamp: new Date(),
                    messages: [...messages], // Save the complete conversation
                };
                setChatHistories(prev => [newHistory, ...prev].slice(0, 5));
            }
        }
        setMessages([]);
        setCurrentScreen('main');
    };

    const handleSendMessage = async (text: string) => {
        const userMessage: Message = {
            role: 'user',
            content: text,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);

        setIsLoading(true);
        try {
            const response = await sendChatMessage(text);
            const assistantMessage: Message = { 
                role: 'assistant', 
                content: response.message,
                isTyping: true,
                timestamp: new Date(),
            };

            setMessages((prev) => {
                const newMessages = [...prev, assistantMessage];
                // Start typing effect for the new assistant message
                setTypingMessageIndex(newMessages.length - 1);
                return newMessages;
            });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="chat-overlay" />
            <Dialog.Content className="chat-dialog-new">
                {currentScreen === 'main' ? (
                    <MainScreen 
                        onStartChat={startChat}
                        chatHistories={chatHistories}
                    />
                ) : (
                    <ChatScreen
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        onEndChat={endChat}
                        isLoading={isLoading}
                        typingMessageIndex={typingMessageIndex}
                        displayedContent={displayedContent}
                    />
                )}
            </Dialog.Content>
        </Dialog.Portal>
    );
};

export default ChatDialog;
