import React from 'react';
import Message from './Message';

const MessageList = ({ messages, onEditMessage, onDeleteMessage }) => {
    const messageItems = messages.map((message, index) => (
        <Message
            key={index}
            isMyMessage={message.isMyMessage}
            message={message}
            onEditMessage={onEditMessage}
            onDeleteMessage={onDeleteMessage}
        />
    ));

    return (
        <div id="chat-message-list" className="flex flex-col gap-4 p-4 overflow-y-auto h-full">
            {messageItems}
        </div>
    );
};

export default MessageList;
