// pages/index.js나 해당하는 페이지 컴포넌트
import ChatButton from '../components/Chat/ChatButton';

export default function Home() {
    return (
        <div>
            {/* 기존 컨텐츠 */}
            <ChatButton />
        </div>
    );
}