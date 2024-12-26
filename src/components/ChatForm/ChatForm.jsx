import React, { useState } from 'react';

function ChatForm({ handleSendMessage }) {
    const [messageText, setMessageText] = useState('');

    const sendMessage = () => {
        if (messageText.trim()) {
            handleSendMessage(messageText.trim());
            setMessageText('');
        }
    };

    return (
        <div className="grid grid-cols-[1fr_auto] items-center gap-4 bg-gray-200 border-t border-gray-300 px-10 py-3 ">
            <input
                type="text"
                placeholder="Type a message"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="outline-none p-3 border-2 border-gray-300 text-gray-800 rounded-lg text-md w-full"
            />
            <button
                onClick={sendMessage}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
                Send
            </button>
        </div>
    );
}

export default ChatForm;
