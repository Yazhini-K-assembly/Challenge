import React from 'react';
import logo from '../../images/icons/attachment-logo.svg';

function ChatForm() {
    return (
        <div className="grid grid-cols-[32px_1fr] items-center gap-4 bg-gray-200 border-t border-gray-300 rounded-bl-lg px-10 py-3">
            <img src={logo} alt="Add Attachment" className="cursor-pointer" />
            <input 
                type="text" 
                placeholder="type a message" 
                className="outline-none p-3 border-2 border-gray-300 text-gray-800 rounded-lg text-md w-full"
            />
        </div>
    );
}

export default ChatForm;
