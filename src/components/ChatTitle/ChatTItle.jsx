import React, { useContext } from 'react';
import { ConversationsContext } from '../../reducers/ConversationsContext';
import Trash from '../../images/icons/trash-logo.svg';

const ChatTitle = ({ selectedConversation }) => {
    const { state, dispatch } = useContext(ConversationsContext);

    const handleDelete = () => {
        const confirmed = window.confirm(`Are you sure you want to delete the conversation with ${selectedConversation.title}?`);
        if (confirmed) {
            dispatch({ type: 'DELETE_CONVERSATION', conversationId: selectedConversation.id });
        }
    };

    if (!selectedConversation) {
        return null; 
    }

    return (
        <div className="grid grid-cols-[1fr_36px] items-center bg-gray-200 text-blue-700 font-bold text-2xl rounded-tr-lg shadow px-5 py-2">
            <span>{selectedConversation.title}</span>
            <img
                src={Trash}
                alt="Delete Conversation"
                className="cursor-pointer"
                onClick={handleDelete}
            />
        </div>
    );
};

export default ChatTitle;
