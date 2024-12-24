import React from 'react';
import ConversationItem from '../conversationItem/ConversationItem';

const ConversationList = ({ conversations, selectedConversationId, onConversationItemSelected }) => {
    const conversationItems = conversations.map((conversation) => (
        <ConversationItem
            key={conversation.id}
            onConversationItemSelected={onConversationItemSelected}
            isActive={conversation.id === selectedConversationId}
            conversation={conversation}
        />
    ));

    return <div className="bg-blue-800 overflow-y-scroll h-full">{conversationItems}</div>;
};

export default ConversationList;
