import React from 'react';
import classNames from 'classnames';


const Message = ({ isMyMessage, message }) => {
    const messageClass = classNames({
        'justify-end': isMyMessage,
        'justify-start': !isMyMessage,
    });

    const imageThumbnail = isMyMessage ? null : (
        <img src={message.imageUrl} alt={message.imageAlt} className="w-10 h-10 rounded-full" />
    );

    return (
        <div className={`flex items-start gap-2 p-2 ${messageClass}`}>
            {imageThumbnail}
            <div className="bg-gray-100 dark:bg-blue-500 p-3 rounded-lg max-w-lg">
                <div className="text-sm text-gray-600 dark:text-gray-100">{message.messageText}</div>
                <div className="text-xs text-gray-100 mt-1">{message.createdAt}</div>
            </div>
        </div>
    );
};

export default Message;
