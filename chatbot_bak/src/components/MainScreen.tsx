import { MessageCircle, MapPin, HelpCircle, ShoppingCart, Clock } from 'lucide-react';
import { ChatHistory } from '../App';

interface MainScreenProps {
  onStartChat: (initialMessage?: string) => void;
  chatHistories: ChatHistory[];
}

export function MainScreen({ onStartChat, chatHistories }: MainScreenProps) {
  const hashtags = [
    '추천차량',
    '타임딜',
    '신차급',
    '할인특가',
    '하이브리드',
    'SUV',
  ];

  const quickMenus = [
    { icon: ShoppingCart, label: '중고차구매방법', message: '중고차 구매방법 알려주세요' },
    { icon: MapPin, label: '매매센터 위치보기', message: '매매센터 위치 알려주세요' },
    { icon: HelpCircle, label: '자주하는질문', message: '자주하는 질문 알려주세요' },
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
      {/* Header */}
      <div className="px-6 pt-16 pb-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-800 mb-2">무엇을 도와드릴까요?</h1>
          <p className="text-gray-500">중고차 전문 AI 상담 서비스</p>
        </div>
      </div>

      {/* Hashtags */}
      <div className="px-6 mb-6">
        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag) => (
            <button
              key={tag}
              onClick={() => onStartChat(tag)}
              className="px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
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
                <span className="text-gray-700">{menu.label}</span>
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
                onClick={() => onStartChat()}
                className={`w-full px-5 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors ${
                  index !== chatHistories.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <MessageCircle className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                <div className="flex-1 text-left min-w-0">
                  <p className="text-gray-700 truncate">{history.lastMessage}</p>
                  <p className="text-gray-400">{formatTimestamp(history.timestamp)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Input (Click to Start) */}
      <div className="mt-auto px-6 pb-8">
        <button
          onClick={() => onStartChat()}
          className="w-full px-6 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          <MessageCircle className="w-5 h-5" />
          <span>상담 시작하기</span>
        </button>
      </div>
    </div>
  );
}
