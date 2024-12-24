import React from 'react';
import Trash from '../../images/icons/trash-logo.svg';

const ChatTitle = ({ selectedConversation }) => {
    // Check if selectedConversation is valid before accessing its properties
    if (!selectedConversation) {
        return null; // or render a placeholder message if you prefer
    }

    return (
        <div className="grid grid-cols-[1fr_36px] items-center bg-gray-200 text-blue-700 font-bold text-2xl rounded-tr-lg shadow px-5 py-2">
            <span>{selectedConversation.title}</span>
            <img src={Trash} alt="Delete Conversation" className="cursor-pointer" />
        </div>
    );
}

export default ChatTitle;
