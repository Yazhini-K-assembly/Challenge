import React, { useState, useEffect } from 'react';

const ChatForm = ({ handleSendMessage, initialText }) => {
    const [text, setText] = useState(initialText);

    useEffect(() => {
        setText(initialText);
    }, [initialText]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return; // Prevent empty messages
        handleSendMessage(text);
        setText(''); // Clear input after sending
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message"
                className="flex-grow p-2 border rounded"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                Send
            </button>
        </form>
    );
};

export default ChatForm;
