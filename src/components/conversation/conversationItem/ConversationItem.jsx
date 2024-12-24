import React from 'react';
import classNames from 'classnames';

const ConversationItem = ({ conversation, isActive, onConversationItemSelected }) => {
    const className = classNames(
        'grid grid-cols-[40px_1fr_max-content] gap-2 border-b border-blue-800 p-5 text-gray-300 text-base text-customSize',
        {
            'bg-blue-500': isActive,
            'hover:bg-blue-900 cursor-pointer': true,
        }
    );

    return (
        <div className={className} onClick={() => onConversationItemSelected(conversation.id)}>
            <img src={conversation.imageUrl} alt={conversation.imageAlt} className="h-10 w-10 rounded-full row-span-2" />
            <div className="font-semibold text-gray-200 truncate">{conversation.title}</div>
            <div className="text-gray-400 text-sm truncate">{conversation.createdAt}</div>
            <div className="col-span-2 pl-2 truncate">{conversation.latestMessageText}</div>
        </div>
    );
};

export default ConversationItem;
