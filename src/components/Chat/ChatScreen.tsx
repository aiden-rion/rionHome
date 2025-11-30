import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, User, X, Mail } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { sendChatInquiry } from '../../lib/email';

// Function to format message content with proper line breaks and bold text
const formatMessageContent = (content: string) => {
    // Convert **text** to <strong>text</strong> for bold formatting
    let formatted = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Handle numbered lists - convert lines starting with numbers
    formatted = formatted.replace(/^(\d+\.\s+)/gm, '<span class="chat-list-number">$1</span>');

    // Convert double line breaks to paragraph breaks
    formatted = formatted.replace(/\n\n/g, '<br/><br/>');

    // Convert single line breaks to <br/> tags
    formatted = formatted.replace(/\n/g, '<br/>');

    return formatted;
};

interface Message {
    role: 'user' | 'assistant';
    content: string;
    isTyping?: boolean;
    timestamp: Date;
}

interface ChatScreenProps {
    messages: Message[];
    onSendMessage: (text: string) => void;
    onEndChat: () => void;
    isLoading: boolean;
    typingMessageIndex: number | null;
    displayedContent: string;
}

export function ChatScreen({ 
    messages, 
    onSendMessage, 
    onEndChat, 
    isLoading,
    typingMessageIndex,
    displayedContent
}: ChatScreenProps) {
    const [inputText, setInputText] = useState('');
    const [isEmailSending, setIsEmailSending] = useState(false);
    const [emailStatus, setEmailStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputText.trim() && !isLoading) {
            onSendMessage(inputText);
            setInputText('');
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    };

    const handleSendEmail = async () => {
        if (messages.length === 0) {
            setEmailStatus({ type: 'error', message: '전송할 대화 내용이 없습니다.' });
            return;
        }

        setIsEmailSending(true);
        setEmailStatus({ type: null, message: '' });

        try {
            const result = await sendChatInquiry(messages);
            setEmailStatus({ 
                type: result.success ? 'success' : 'error', 
                message: result.message 
            });
        } catch (error) {
            setEmailStatus({ 
                type: 'error', 
                message: '문의 내역 전송 중 오류가 발생했습니다.' 
            });
        } finally {
            setIsEmailSending(false);
            // Clear status message after 5 seconds
            setTimeout(() => {
                setEmailStatus({ type: null, message: '' });
            }, 5000);
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-gray-50 h-full overflow-hidden">
            {/* Header */}
            <div className="bg-white px-4 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onEndChat}
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">리온코 상담</h2>
                        <p className="text-sm text-gray-500">온라인</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleSendEmail}
                        disabled={isEmailSending || messages.length === 0}
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="문의내역을 리온코에 전송"
                    >
                        <Mail className={`w-5 h-5 ${isEmailSending ? 'text-blue-600' : 'text-gray-700'}`} />
                    </button>
                    <Dialog.Close className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-700" />
                    </Dialog.Close>
                </div>
            </div>

            {/* Email Status Message */}
            {emailStatus.type && (
                <div className={`px-4 py-3 text-sm ${
                    emailStatus.type === 'success' 
                        ? 'bg-green-50 text-green-800 border-b border-green-200' 
                        : 'bg-red-50 text-red-800 border-b border-red-200'
                }`}>
                    <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{emailStatus.message}</span>
                    </div>
                </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 min-h-0">
                {messages.map((message, index) => {
                    const isCurrentlyTyping = message.isTyping && typingMessageIndex === index;
                    const contentToShow = isCurrentlyTyping ? displayedContent : message.content;

                    return (
                        <div
                            key={index}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`flex gap-2 w-full max-w-[85%] ${
                                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                                }`}
                            >
                                {/* Avatar */}
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 self-start ${
                                        message.role === 'user' ? 'bg-blue-600' : 'bg-purple-600'
                                    }`}
                                >
                                    {message.role === 'user' ? (
                                        <User className="w-4 h-4 text-white" />
                                    ) : (
                                        <span className="text-white text-xs font-bold">AI</span>
                                    )}
                                </div>

                                {/* Message Bubble */}
                                <div className="flex flex-col flex-1 min-w-0">
                                    <div
                                        className={`px-4 py-3 rounded-2xl ${
                                            message.role === 'user'
                                                ? 'bg-blue-600 text-white rounded-tr-sm'
                                                : 'bg-white text-gray-800 rounded-tl-sm shadow-sm'
                                        } ${isCurrentlyTyping ? 'typing' : ''}`}
                                    >
                                        <div 
                                            dangerouslySetInnerHTML={{ 
                                                __html: formatMessageContent(contentToShow) 
                                            }}
                                        />
                                        {isCurrentlyTyping && (
                                            <span className="typing-cursor">|</span>
                                        )}
                                    </div>

                                    <span
                                        className={`text-xs text-gray-400 mt-1 ${
                                            message.role === 'user' ? 'text-right' : 'text-left'
                                        }`}
                                    >
                                        {formatTime(message.timestamp)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white px-4 py-4 border-t border-gray-200 flex-shrink-0">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="메시지를 입력하세요..."
                        className="flex-1 px-4 py-3 bg-gray-100 rounded-full outline-none focus:bg-gray-200 transition-colors"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={!inputText.trim() || isLoading}
                        className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
