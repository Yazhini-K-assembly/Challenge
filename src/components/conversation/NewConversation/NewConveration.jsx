import React, { useState, useContext } from 'react';
import { ConversationsContext } from '../../../reducers/ConversationsContext';

function NewConversation() {
    const { dispatch } = useContext(ConversationsContext);
    const [recipientName, setRecipientName] = useState('');

    const handleAddConversation = () => {
        if (recipientName.trim()) {
            dispatch({ type: 'ADD_CONVERSATION', recipientName });
            setRecipientName(''); 
        } else {
            alert("Please enter a valid recipient name.");
        }
    };

    return (
        <div className="h-24 bg-blue-600 grid grid-rows-[40px] grid-cols-[1fr_auto] content-center p-4 gap-2">
            <input
                type="text"
                placeholder="Enter recipient name"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="p-2 rounded"
            />
            <button
                onClick={handleAddConversation}
                className="flex items-center justify-center bg-gray-200 rounded-full text-blue-900 px-3">
             Add   
            </button>
        </div>
    );
}

export default NewConversation;
