import React, { useContext } from 'react';
import { ConversationsContext } from '../../reducers/ConversationsContext';
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
        const selectedConversation = state.conversations.find(
            (conversation) => conversation.id === conversationId
        );

        dispatch({ type: 'SELECTED_CONVERSATION_CHANGED', conversationId });
        };

    const handleSendMessage = (text) => {
        if (!state.selectedConversation) return;

        const userMessage = {
            imageUrl: '', 
            imageAlt: 'You',
            messageText: text, //the text passed to the function
            createdAt: new Date().toLocaleString(),
            isMyMessage: true,
        };

        // Add user message
        dispatch({
            type: 'ADD_MESSAGE',
            conversationId: state.selectedConversation.id,
            message: userMessage,
        });

        // Generate recipient's reply
        setTimeout(() => {
            const recipientMessage = {
                imageUrl: state.selectedConversation.imageUrl,
                imageAlt: state.selectedConversation.title,
                messageText: faker.lorem.sentence(),
                createdAt: new Date().toLocaleString(),
                isMyMessage: false,
            };

            dispatch({
                type: 'ADD_MESSAGE',
                conversationId: state.selectedConversation.id,
                message: recipientMessage,
            });
        }, 1000); 
    };

    return (
        <div
            className="grid grid-rows-[70px_1fr_78px] grid-cols-[275px_1fr] h-screen bg-white overflow-y-auto"
            style={{
                gridTemplateAreas: `
                    'search-container chat-title'
                    'conversation-list chat-message-list'
                    'new-message-container chat-form'
                `,
            }}
        >
            <div className="row-start-1 col-start-1 area-[search-container]">
                <ConversationSearch />
            </div>

            <div className="row-start-2 col-start-1 area-[conversation-list] overflow-y-auto">
                <ConversationList
                    onConversationItemSelected={handleConversationChange}
                    conversations={state.conversations}
                    selectedConversationId={state.selectedConversation?.id}
                />
            </div>

            <div className="row-start-3 col-start-1 area-[new-message-container]">
                <NewConversation />
            </div>

            <div className="row-start-1 col-start-2 area-[chat-title]">
                <ChatTitle selectedConversation={state.selectedConversation} />
            </div>

            <div className="row-start-2 col-start-2 area-[chat-message-list] overflow-y-auto">
                <MessageList messages={state.selectedConversation?.messages || []} />
            </div>

            <div className="row-start-3 col-start-2 area-[chat-form]">
                <ChatForm handleSendMessage={handleSendMessage} />
            </div>
        </div>
    );
};

export default ChatShell;
