import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, User } from 'lucide-react';
import { Message } from '../App';
import { VehicleCard } from './VehicleCard';

interface ChatScreenProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  onEndChat: () => void;
  onConnectAgent: () => void;
}

export function ChatScreen({ messages, onSendMessage, onEndChat, onConnectAgent }: ChatScreenProps) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
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
            <h2 className="text-gray-800">AI 상담</h2>
            <p className="text-gray-500">온라인</p>
          </div>
        </div>
        <button
          onClick={onConnectAgent}
          className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
        >
          상담원 연결
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 min-h-0">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex gap-2 w-full max-w-[85%] ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 self-start ${
                  message.sender === 'user' ? 'bg-blue-600' : 'bg-purple-600'
                }`}
              >
                {message.sender === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <span className="text-white">AI</span>
                )}
              </div>

              {/* Message Bubble */}
              <div className="flex flex-col flex-1 min-w-0">
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-sm'
                      : 'bg-white text-gray-800 rounded-tl-sm shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                </div>
                
                {/* Vehicle Cards */}
                {message.vehicles && message.vehicles.length > 0 && (
                  <div className="mt-3 space-y-3">
                    {message.vehicles.map((vehicle) => (
                      <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                  </div>
                )}
                
                <span
                  className={`text-gray-400 mt-1 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
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
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}