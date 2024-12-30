import React, { useContext, useState } from 'react';
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
    const [editingMessage, setEditingMessage] = useState(null);

    const handleConversationChange = (conversationId) => {
        dispatch({ type: 'SELECTED_CONVERSATION_CHANGED', conversationId });
    };

    const handleSendMessage = (text) => {
        if (!state.selectedConversation) return;
    
        if (editingMessage) {
            dispatch({
                type: 'EDIT_MESSAGE',
                conversationId: state.selectedConversation.id,
                message: { ...editingMessage, messageText: text },
            });
    
            setEditingMessage(null); // Clear editing state after the update
        } else {
            const userMessage = {
                id: `${Date.now()}`,  
                imageUrl: '',
                imageAlt: 'You',
                messageText: text,
                createdAt: new Date().toLocaleString(),
                isMyMessage: true,  
            };
    
            dispatch({
                type: 'ADD_MESSAGE',
                conversationId: state.selectedConversation.id,
                message: userMessage,
            });
    
            setTimeout(() => {
                const recipientMessage = {
                    id: `${Date.now()}_reply`,  
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
        }
    };
    
    
    const handleEditMessage = (message) => {
        setEditingMessage(message);
    };

    const handleDeleteMessage = (messageId) => {
        if (!state.selectedConversation) return;

        dispatch({
            type: 'DELETE_MESSAGE',
            conversationId: state.selectedConversation.id,
            messageId,
        });
    };

    return (
        <div
            className="grid grid-rows-[71px_1fr_78px] grid-cols-[275px_1fr] h-screen bg-white overflow-y-auto"
            style={{
                gridTemplateAreas:
                    `'search-container chat-title'
                     'conversation-list chat-message-list'
                     'new-message-container chat-form'`,
            }}
        >
            <div className="row-start-1 col-start-1 area-[search-container]">
                <ConversationSearch />
            </div>

            <div className="row-start-2 col-start-1 area-[conversation-list] overflow-y-auto">
                <ConversationList
                    onConversationItemSelected={handleConversationChange}
                    conversations={state.filteredConversations}
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
                <MessageList
                    messages={state.selectedConversation?.messages || []}
                    onEditMessage={handleEditMessage}
                    onDeleteMessage={handleDeleteMessage}
                />
            </div>

            <div className="row-start-3 col-start-2 area-[chat-form]">
            <div className="row-start-3 col-start-2 area-[chat-form]">
               <ChatForm
                  handleSendMessage={handleSendMessage}
                  initialText={editingMessage?.messageText || ''}
               />
            </div>

            </div>
        </div>
    );
};

export default ChatShell;
