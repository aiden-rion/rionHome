// src/lib/email.ts
import emailjs from '@emailjs/browser';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

// EmailJS configuration from environment variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Check if EmailJS is properly configured
const isEmailJSConfigured = (): boolean => {
    return !!(
        EMAILJS_SERVICE_ID && 
        EMAILJS_TEMPLATE_ID && 
        EMAILJS_PUBLIC_KEY &&
        EMAILJS_SERVICE_ID !== 'REPLACE_WITH_ACTUAL_SERVICE_ID' &&
        EMAILJS_TEMPLATE_ID !== 'REPLACE_WITH_ACTUAL_TEMPLATE_ID' &&
        EMAILJS_PUBLIC_KEY !== 'REPLACE_WITH_ACTUAL_PUBLIC_KEY' &&
        !EMAILJS_SERVICE_ID.includes('REPLACE_WITH_ACTUAL_') &&
        !EMAILJS_TEMPLATE_ID.includes('REPLACE_WITH_ACTUAL_') &&
        !EMAILJS_PUBLIC_KEY.includes('REPLACE_WITH_ACTUAL_')
    );
};

// Format chat messages for email content
const formatChatForEmail = (messages: Message[]): string => {
    const formatTime = (date: Date) => {
        return date.toLocaleString('ko-KR', { 
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        });
    };

    let emailContent = '=== 리온코 채팅 문의 내역 ===\n\n';
    emailContent += `문의 시간: ${formatTime(new Date())}\n\n`;
    emailContent += '=== 대화 내용 ===\n\n';

    messages.forEach((message, index) => {
        const sender = message.role === 'user' ? '고객' : '리온코 AI';
        const time = formatTime(message.timestamp);

        emailContent += `[${sender}] ${time}\n`;
        emailContent += `${message.content}\n\n`;
    });

    emailContent += '=== 문의 내역 끝 ===\n\n';
    emailContent += '이 문의는 리온코 홈페이지 채팅 시스템을 통해 자동으로 전송되었습니다.';

    return emailContent;
};

// Send chat inquiry to new@rion.kr
export const sendChatInquiry = async (messages: Message[]): Promise<{ success: boolean; message: string }> => {
    try {
        // Check if EmailJS is properly configured
        if (!isEmailJSConfigured()) {
            return {
                success: false,
                message: 'EmailJS가 설정되지 않았습니다. 관리자에게 문의하세요. (EmailJS configuration required)'
            };
        }

        // Format the chat messages for email
        const emailContent = formatChatForEmail(messages);

        // Prepare email parameters
        const templateParams = {
            to_email: 'new@rion.kr',
            from_name: '리온코 채팅 시스템',
            subject: `채팅 문의 내역 - ${new Date().toLocaleDateString('ko-KR')}`,
            message: emailContent,
            reply_to: 'noreply@rion.kr'
        };

        // Send email using EmailJS
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_PUBLIC_KEY
        );

        if (response.status === 200) {
            return {
                success: true,
                message: '문의 내역이 성공적으로 전송되었습니다.'
            };
        } else {
            throw new Error('이메일 전송에 실패했습니다.');
        }
    } catch (error) {
        console.error('Email sending error:', error);
        return {
            success: false,
            message: '문의 내역 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
        };
    }
};
