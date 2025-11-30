import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function App() {
  const [isHovered, setIsHovered] = useState(false);

  const handleConsultation = () => {
    alert('AI 상담을 시작합니다!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="mb-8 text-gray-800">AI 상담 서비스</h1>
        
        <button
          onClick={handleConsultation}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <MessageCircle 
            className={`transition-transform duration-300 ${isHovered ? 'rotate-12' : ''}`}
            size={24}
          />
          <span className="text-lg">AI 상담 시작하기</span>
          
          {/* Animated shine effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </button>

        <p className="mt-6 text-gray-600 text-sm">
          24시간 언제든지 AI와 상담하실 수 있습니다
        </p>
      </div>
    </div>
  );
}
