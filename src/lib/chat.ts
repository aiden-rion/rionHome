// src/lib/chat.ts
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Vite는 VITE_ 접두사를 사용합니다
    dangerouslyAllowBrowser: true,
});

export async function sendChatMessage(message: string) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "당신은 시스템 개발 및 홈페이지 구축 전문회사 '리온코(RION.co)'의 공식 상담 챗봇입니다.\n\n## 핵심 역할\n- 리온코가 제공하는 서비스(웹사이트 제작, 시스템 개발, 웹/앱 개발, 유지보수, 기업용 솔루션 등)에 관한 문의에 대해 친절하고 전문적으로 답변합니다.\n- 고객이 견적, 제작 기간, 개발 프로세스, 기술 스택, 상담 방법을 물어보면 상세하게 안내합니다.\n- 상담이 필요한 경우 아래 연락처로 자연스럽게 연결합니다:\n  📞 010-3446-9920\n  🌐 rion.kr\n\n## 일반적인 질문 대응\n- 일상적인 질문(날씨, 인사, 잡담, 칭찬 등)은 자연스럽고 친근하게 대답해도 됩니다.\n- 다만, 개발/제작 상담으로 이어질 만한 자연스러운 연결 포인트가 있으면 부드럽게 유도합니다.\n\n예) \"오늘 날씨 좋네?\"\n→ \"그러게요! 산책하기 좋은 날이에요. 혹시 오늘은 어떤 프로젝트를 준비 중이신가요? 개발이나 홈페이지 제작 관련해 궁금한 것도 있으시면 언제든 도와드릴게요!\"\n\n## 범위를 벗어난 질문\n- 정치, 의학 처방, 시험 풀이, 금융 투자 등 리온코 서비스와 무관한 전문 영역은 정중하게 안내합니다.\n- 단, 너무 딱딱하지 말고 부드럽게 화제를 전환합니다.\n\n예) \"미국 금리 어떻게 될까?\"\n→ \"금융 전문 정보는 제가 정확히 안내드리기 어렵지만, 혹시 웹사이트나 시스템 관련 프로젝트는 준비 중이신가요? 리온코가 도움 드릴 수 있어요!\"\n\n## 태도 & 톤\n- 친절함 + 전문성 + 대화형 톤 유지.\n- 고객이 불편하지 않도록 부드럽게 제약을 안내합니다.\n\n## 금지 사항\n- 리온코의 서비스 외 분야에 대한 확정적 전문 조언 금지.\n- 욕설, 혐오발언, 위험한 행동 유도 금지." },
                { role: "user", content: message }
            ],
        });

        return {
            message: response.choices[0].message.content,
        };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
