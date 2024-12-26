import React, { createContext, useReducer, useEffect } from 'react';
import { faker } from '@faker-js/faker';

// Function to generate conversations
const initializeConversations = () => {
    console.log('Generating new conversations data using faker-js...');
    return [];
};

// Callback to initialize state
const initialStateCallback = () => {
    console.log('Checking for existing conversations data in local storage...');
    const savedState = localStorage.getItem('conversationsState');

    if (savedState) {
        console.log('Restoring conversations data...');
        return JSON.parse(savedState);
    } else {
        console.log('No data found in local storage.');
        return {
            conversations: initializeConversations(),
            selectedConversation: null,
        };
    }
};

export const initialState = initialStateCallback();

// Reducer function
export const conversationsReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_CONVERSATION': {
            const newConversation = {
                id: String(state.conversations.length + 1),
                imageUrl: faker.image.avatar(),
                imageAlt: action.recipientName,
                title: action.recipientName,
                createdAt: new Date().toLocaleString(),
                latestMessageText: '',
                messages: [],
            };

            const updatedConversations = [...state.conversations, newConversation];

            return {
                ...state,
                conversations: updatedConversations,
            };
        }

        case 'SELECTED_CONVERSATION_CHANGED': {
            const selectedConversation = state.conversations.find(
                (conversation) => conversation.id === action.conversationId
            );

            return {
                ...state,
                selectedConversation,
            };
        }

        case 'MESSAGES_LOADED': {
            console.log(`Messages loaded for conversation ID: ${action.conversationId}`);
            const updatedConversations = state.conversations.map((conversation) => {
                if (conversation.id === action.conversationId) {
                    const latestMessage = action.messages[action.messages.length - 1];
                    const formattedDate = latestMessage
                        ? new Date(latestMessage.createdAt).toLocaleString()
                        : conversation.createdAt;

                    // Save messages to local storage
                    localStorage.setItem(`messages_${action.conversationId}`, JSON.stringify(action.messages));

                    return {
                        ...conversation,
                        messages: action.messages,
                        latestMessageText: latestMessage ? latestMessage.messageText : conversation.latestMessageText,
                        createdAt: formattedDate,
                    };
                }
                return conversation;
            });

            return {
                ...state,
                conversations: updatedConversations,
                selectedConversation: updatedConversations.find(
                    (conversation) => conversation.id === action.conversationId
                ),
            };
        }

        case 'DELETE_CONVERSATION': {
            // Remove messages from local storage
            localStorage.removeItem(`messages_${action.conversationId}`);

            const updatedConversations = state.conversations.filter(
                (conversation) => conversation.id !== action.conversationId
            );

            const updatedSelectedConversation =
                state.selectedConversation?.id === action.conversationId
                    ? null
                    : state.selectedConversation;

            return {
                ...state,
                conversations: updatedConversations,
                selectedConversation: updatedSelectedConversation,
            };
        }

        default:
            console.warn(`Unhandled action type: ${action.type}`);
            return state;
    }
};

export const ConversationsContext = createContext();

export const ConversationsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(conversationsReducer, initialState);

    // Persist state to local storage whenever it changes
    useEffect(() => {
        console.log('Persisting state to local storage...');
        localStorage.setItem('conversationsState', JSON.stringify(state));
    }, [state]);

    return (
        <ConversationsContext.Provider value={{ state, dispatch }}>
            {children}
        </ConversationsContext.Provider>
    );
};
