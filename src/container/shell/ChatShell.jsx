import React, { useContext, useEffect } from 'react';
import { ConversationsContext } from '../../App';
import { faker } from '@faker-js/faker';

import ConversationSearch from '../../components/conversation/conversationSearch/ConversationSearch';
import ConversationList from '../../components/conversation/conversationList/ConversationList';
import NewConversation from '../../components/conversation/NewConversation/NewConveration';
import ChatTitle from '../../components/ChatTitle/ChatTItle';
import MessageList from '../../components/Message/MessageList';
import ChatForm from '../../components/ChatForm/ChatForm';

const ChatShell = () => {
    const { state, dispatch } = useContext(ConversationsContext);

    const handleConversationChange = (conversationId) => {
        dispatch({ type: 'SELECTED_CONVERSATION_CHANGED', conversationId });

        // Generate fake messages for the selected conversation
        const messages = generateConversation(conversationId);

        dispatch({ type: 'MESSAGES_LOADED', conversationId, messages });
    };

    const generateConversation = (conversationId) => {
        const person1Name = "Yazhini K"; 
        const selectedConversation = state.conversations.find(
            (conversation) => conversation.id === conversationId
        );
        
        // Ensure there's a valid selected conversation
        const person2Name = selectedConversation ? selectedConversation.title : faker.person.fullName();
    
        let conversation = [];
    
        // Create a conversation with 6 messages (alternating between two people)
        for (let i = 0; i < 6; i++) {
            const senderName = i % 2 === 0 ? person1Name : person2Name;
            const recipientName = i % 2 === 0 ? person2Name : person1Name;
    
            const messageText = generateMeaningfulMessage(senderName, recipientName);
            const message = {
                imageUrl: selectedConversation.imageUrl,  
                imageAlt: senderName,
                messageText: messageText,
                createdAt: faker.date.recent().toLocaleString(),
                isMyMessage: i % 2 === 0, // alternate sender
            };
    
            conversation.push(message);
        }
    
        return conversation;
    };
    

    // Function to generate a sentence 
    const generateMeaningfulMessage = (senderName, recipientName) => {
        const message = `${senderName}: Hey ${recipientName}, ${faker.lorem.sentence()} ${faker.lorem.sentence()}`;
        return message;
    };

    return (
        <div
            className="grid grid-rows-[71px_1fr_78px] grid-cols-[275px_1fr] h-screen bg-white overflow-y-auto"
            style={{
                gridTemplateAreas: `
                    'search-container chat-title'
                    'conversation-list chat-message-list'
                    'new-message-container chat-form'
                `
            }}
        >
            {/* Search Container */}
            <div className="row-start-1 col-start-1 area-[search-container]">
                <ConversationSearch />
            </div>

            {/* Conversation List */}
            <div className="row-start-2 col-start-1 area-[conversation-list] overflow-y-auto">
                <ConversationList
                    onConversationItemSelected={handleConversationChange}
                    conversations={state.conversations}
                    selectedConversationId={state.selectedConversation?.id}
                />
            </div>

            {/* New Conversation */}
            <div className="row-start-3 col-start-1 area-[new-message-container]">
                <NewConversation />
            </div>

            {/* Chat Title */}
            <div className="row-start-1 col-start-2 area-[chat-title]">
                <ChatTitle selectedConversation={state.selectedConversation} />
            </div>

            {/* Message List */}
            <div className="row-start-2 col-start-2 area-[chat-message-list] overflow-y-auto">
                <MessageList messages={state.selectedConversation?.messages || []} />
            </div>

            {/* Chat Form */}
            <div className="row-start-3 col-start-2 area-[chat-form]">
                <ChatForm />
            </div>
        </div>
    );
};

export default ChatShell;
