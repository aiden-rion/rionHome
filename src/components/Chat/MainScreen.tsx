import { MessageCircle, Code, Globe, HelpCircle, Clock, Phone, X } from 'lucide-react';
import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface ChatHistory {
  id: string;
  lastMessage: string;
  timestamp: Date;
  messages: any[];
}

interface MainScreenProps {
  onStartChat: (initialMessage?: string, historyId?: string) => void;
  chatHistories: ChatHistory[];
}

export function MainScreen({ onStartChat, chatHistories }: MainScreenProps) {
  const [isHovered, setIsHovered] = useState(false);

  const hashtags = [
    '홈페이지제작',
    '시스템개발',
    '웹앱개발',
    '유지보수',
    '견적문의',
    '포트폴리오',
  ];

  const quickMenus = [
    { icon: Globe, label: '홈페이지 제작 문의', message: '홈페이지 제작에 대해 문의드립니다' },
    { icon: Code, label: '시스템 개발 상담', message: '시스템 개발 상담을 받고 싶습니다' },
    { icon: HelpCircle, label: '자주하는질문', message: '자주하는 질문을 알려주세요' },
  ];

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    return `${days}일 전`;
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-6 pt-8 pb-6 relative">
          {/* Close Button */}
          <Dialog.Close className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-700" />
          </Dialog.Close>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800 mb-2">무엇을 도와드릴까요?</h1>
            <p className="text-gray-500">리온코 개발 전문 상담 서비스</p>
          </div>
        </div>

        {/* Hashtags */}
        <div className="px-6 mb-6">
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag) => (
              <button
                key={tag}
                onClick={() => onStartChat(tag)}
                className="px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-full hover:bg-blue-50 transition-colors text-sm"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Menu */}
        <div className="px-6 mb-6">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {quickMenus.map((menu, index) => {
              const Icon = menu.icon;
              return (
                <button
                  key={menu.label}
                  onClick={() => onStartChat(menu.message)}
                  className={`w-full px-5 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${
                    index !== quickMenus.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700 text-left">{menu.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Chat History */}
        {chatHistories.length > 0 && (
          <div className="px-6 mb-6">
            <h3 className="text-gray-700 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              최근 대화내역
            </h3>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {chatHistories.map((history, index) => (
                <button
                  key={history.id}
                  onClick={() => onStartChat(undefined, history.id)}
                  className={`w-full px-5 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors ${
                    index !== chatHistories.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <MessageCircle className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-gray-700 truncate text-sm">{history.lastMessage}</p>
                    <p className="text-xs text-gray-400">{formatTimestamp(history.timestamp)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Button */}
      <div className="popup-btn flex-shrink-0 px-6 py-6 bg-gradient-to-b from-blue-50 to-white border-t border-blue-100">
        <button
          onClick={() => onStartChat()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
        >
          <MessageCircle 
            className={`transition-transform duration-300 ${isHovered ? 'rotate-12' : ''}`}
            size={24}
          />
          <span className="text-lg">상담 시작하기</span>

          {/* Animated shine effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </button>
      </div>
    </div>
  );
}
