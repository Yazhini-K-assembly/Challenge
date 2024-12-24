import React from 'react';
import Trash from '../../images/icons/trash-logo.svg';

const ChatTitle = ({ selectedConversation }) => {
    if (!selectedConversation) {
        return null; 
    }

    return (
        <div className="grid grid-cols-[1fr_36px] items-center bg-gray-200 text-blue-700 font-bold text-2xl rounded-tr-lg shadow px-5 py-2">
            <span>{selectedConversation.title}</span>
            <img src={Trash} alt="Delete Conversation" className="cursor-pointer" />
        </div>
    );
}

export default ChatTitle;
