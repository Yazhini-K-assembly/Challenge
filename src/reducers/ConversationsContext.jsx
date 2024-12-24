import React, { createContext, useReducer, useEffect } from 'react';
import { faker } from '@faker-js/faker';

// Function to generate conversations
const generateConversations = () => {
    console.log('Generating new conversations data using faker-js...');
    return Array.from({ length: 9 }, (_, index) => ({
        id: String(index + 1),
        imageUrl: faker.image.avatar(),
        imageAlt: faker.person.fullName(),
        title: faker.person.fullName(),
        createdAt: '',
        latestMessageText: '',
        messages: [],
    }));
};

// Callback to initialize state
const initialStateCallback = () => {
    console.log('Checking for existing conversations data in local storage...');
    const savedState = localStorage.getItem('conversationsState');

    if (savedState) {
        console.log('Restoring conversations data from local storage...');
        return JSON.parse(savedState);
    } else {
        console.log('No data found in local storage.');
        return {
            conversations: generateConversations(),
            selectedConversation: null,
        };
    }
};

// Define initial state for export
export const initialState = initialStateCallback();

export const conversationsReducer = (state, action) => {
    switch (action.type) {
        case 'SELECTED_CONVERSATION_CHANGED': {
            const selectedConversation = state.conversations.find(
                (conversation) => conversation.id === action.conversationId
            );

            console.log(`Selected conversation changed: ${action.conversationId}`);
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
                        ? new Date(latestMessage.createdAt).toLocaleString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                              timeZone: 'Asia/Kolkata',
                          })
                        : conversation.createdAt;

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
        default:
            console.warn(`Unhandled action type: ${action.type}`);
            return state;
    }
};

// Define and export context and provider
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
