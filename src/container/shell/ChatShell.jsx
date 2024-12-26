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

        let messages = JSON.parse(
            localStorage.getItem(`messages_${conversationId}`)
        );

        if (!messages) {
            // Generate messages if they are not found in local storage
            messages = generateMessagesForConversation(selectedConversation);
            localStorage.setItem(`messages_${conversationId}`, JSON.stringify(messages));
        }

        dispatch({ type: 'SELECTED_CONVERSATION_CHANGED', conversationId });
        dispatch({ type: 'MESSAGES_LOADED', conversationId, messages });
    };

    const generateMessagesForConversation = (conversation) => {
        const messages = [];
        for (let i = 0; i < 10; i++) {
            const message = {
                imageUrl: conversation.imageUrl,
                imageAlt: conversation.title,
                messageText: `${faker.lorem.sentence()} ${faker.lorem.sentence()}`,
                createdAt: faker.date.recent().toLocaleString(),
                isMyMessage: i % 2 === 0,
            };
            messages.push(message);
        }
        return messages;
    };

    return (
        <div
            className="grid grid-rows-[71px_1fr_78px] grid-cols-[275px_1fr] h-screen bg-white overflow-y-auto"
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
                <ChatForm />
            </div>
        </div>
    );
};

export default ChatShell;
