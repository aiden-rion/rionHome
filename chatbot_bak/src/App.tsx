import { useState } from 'react';
import { OpenAI } from 'openai';
import { MainScreen } from './components/MainScreen';
import { ChatScreen } from './components/ChatScreen';
import { Vehicle } from './components/VehicleCard';
import { loadCarData, CarDataItem } from './utils/carDataParser';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  vehicles?: Vehicle[];
}

export interface ChatHistory {
  id: string;
  lastMessage: string;
  timestamp: Date;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'main' | 'chat'>('main');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);

  const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const client = new OpenAI({
    apiKey: openaiApiKey,
    dangerouslyAllowBrowser: true
  });

  const startChat = (initialMessage?: string) => {
    setCurrentScreen('chat');
    const greeting: Message = {
      id: Date.now().toString(),
      text: '안녕하세요! Tcar 상담 챗봇입니다. 🚗\n차량 구매 관련 문의와 더불어 차량 관련 자주 묻는 질문에 대해서도 안내해드립니다.',
      sender: 'bot',
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
      const lastUserMessage = messages.filter(m => m.sender === 'user').pop();
      if (lastUserMessage) {
        const newHistory: ChatHistory = {
          id: Date.now().toString(),
          lastMessage: lastUserMessage.text,
          timestamp: new Date(),
        };
        setChatHistories(prev => [newHistory, ...prev].slice(0, 5));
      }
    }
    setMessages([]);
    setCurrentScreen('main');
  };

  const connectAgent = () => {
    // 상담원 연결 기능 - 현재는 알림만 표시
    const agentMessage: Message = {
      id: Date.now().toString(),
      text: '상담원 연결 요청이 접수되었습니다. 잠시만 기다려주세요.',
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, agentMessage]);
  };


  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const messagesForOpenAI = [
        { role: 'system', content: `중고차 전문 상담 챗봇입니다. 

일반적인 질문(인사, 날씨, 기타 주제)에 대해서는 간단하고 친근한 일반 응답을 제공하세요.

차량 추천이나 구매 관련 질문에 대해서는 전문적인 답변을 제공하세요. 차량 일반 질문에 대해서는 아래 링크를 참고하여 제한된 범위 내에서 답변하세요: https://mycarsave.lotterentacar.net/ 

중요: 사용자가 차량 추천을 요청하거나 구매 관련 질문을 할 때, 차량 목록을 보여주는 것이 도움이 될 것 같다면 응답 끝에 반드시 "[SHOW_VEHICLES]" 태그를 포함하세요. 이 태그가 있으면 시스템이 자동으로 추천 차량 목록을 표시합니다.

예시:
- 사용자: "중고차 추천해주세요"
- 응답: "네, 좋은 중고차를 추천해드리겠습니다. 다양한 옵션을 준비했으니 아래 차량들을 확인해보세요. [SHOW_VEHICLES]"

[SHOW_VEHICLES] 태그는 차량 목록이 필요한 경우에만 사용하세요.` },
        ...messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })),
        { role: 'user', content: text }
      ];

      // 첫 번째 AI 응답을 받아서 트리거 확인
      const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messagesForOpenAI,
        max_tokens: 1000
      });

      if (!response || !response.choices || !response.choices.length) {
        throw new Error('OpenAI 응답이 올바르지 않습니다.');
      }

      let botText = response.choices[0].message.content;
      let vehicleRecommendations: Vehicle[] = [];

      // AI 응답에서 [SHOW_VEHICLES] 트리거 확인
      const showVehiclesTrigger = '[SHOW_VEHICLES]';
      const shouldShowVehicles = botText.includes(showVehiclesTrigger);

      if (shouldShowVehicles) {
        // 트리거 제거
        botText = botText.replace(showVehiclesTrigger, '').trim();

        // 차량 데이터 로드
        try {
          const carData = await loadCarData();

          if (carData && carData.length > 0) {
            // Vehicle 객체 배열 생성
            vehicleRecommendations = carData.slice(0, 5).map((car: CarDataItem, index: number) => ({
              id: car.id || `vehicle-${index}`,
              name: `${car.brand} ${car.model}`,
              year: car.year || '연식 없음',
              price: car.price || '가격 문의',
              imageUrl: car.imageUrl || '',
              mileage: car.mileage
            }));

            // AI에게 실제 차량 데이터를 제공하여 더 구체적인 응답 생성
            const recommendations = vehicleRecommendations.map(vehicle => 
              `${vehicle.name} (${vehicle.year}) - 가격: ${vehicle.price}${vehicle.mileage ? ` - 주행거리: ${vehicle.mileage}` : ''}`
            ).join('\n');

            const enhancedMessages = [
              ...messagesForOpenAI,
              { role: 'assistant', content: botText },
              { role: 'system', content: `추천 차량 목록:\n${recommendations}\n\n위 차량들의 정보를 활용하여 사용자에게 더 구체적이고 도움이 되는 차량 추천 답변을 제공하세요. 차량 사진과 상세 정보는 별도로 표시됩니다.` },
              { role: 'user', content: '위 차량들에 대해 더 자세히 설명해주세요.' }
            ];

            const enhancedResponse = await client.chat.completions.create({
              model: 'gpt-4o-mini',
              messages: enhancedMessages,
              max_tokens: 1000
            });

            if (enhancedResponse && enhancedResponse.choices && enhancedResponse.choices.length > 0) {
              botText = enhancedResponse.choices[0].message.content;
            }
          } else {
            // 차량 데이터를 불러올 수 없는 경우
            botText += '\n\n현재 차량 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.';
          }
        } catch (err) {
          console.error('차량 데이터 로딩 실패:', err);
          botText += '\n\n현재 차량 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.';
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botText,
        sender: 'bot',
        timestamp: new Date(),
        vehicles: vehicleRecommendations.length > 0 ? vehicleRecommendations : undefined,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: '죄송합니다. 오류가 발생하여 답변을 드릴 수 없습니다.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 md:flex md:items-center md:justify-center md:p-4">
      <div className="w-full h-screen md:h-[800px] md:max-w-md bg-white md:rounded-3xl md:shadow-2xl overflow-hidden flex flex-col">
        {currentScreen === 'main' ? (
          <MainScreen onStartChat={startChat} chatHistories={chatHistories} />
        ) : (
          <ChatScreen
            messages={messages}
            onSendMessage={handleSendMessage}
            onEndChat={endChat}
            onConnectAgent={connectAgent}
          />
        )}
      </div>
    </div>
  );
}
