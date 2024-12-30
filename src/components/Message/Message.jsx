import React, { useState } from 'react';
import classNames from 'classnames';

const Message = ({ isMyMessage, message, onEditMessage, onDeleteMessage }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const messageClass = classNames({
        'justify-end': isMyMessage,
        'justify-start': !isMyMessage,
    });

    const imageThumbnail = isMyMessage ? null : (
        <img src={message.imageUrl} alt={message.imageAlt} className="w-10 h-10 rounded-full" />
    );

    const handleEdit = () => {
        setMenuOpen(false);
        onEditMessage(message); // Pass the entire message object
    };

    const handleDelete = () => {
        setMenuOpen(false);
        onDeleteMessage(message.id);
    };

    return (
        <div className={`relative flex items-start gap-2 p-2 ${messageClass}`}>
            {imageThumbnail}
            <div className="relative bg-gray-100 dark:bg-blue-500 p-3 rounded-lg max-w-lg">
                <div className="text-sm text-gray-600 dark:text-gray-100">{message.messageText}</div>
                <div className="text-xs text-gray-400 mt-1">{message.createdAt}</div>
                {isMyMessage && (
                    <button
                        className="absolute bottom-1 right-1 text-gray-100 hover:text-gray-700 focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        &#x2026; {/* Three-dots icon */}
                    </button>
                )}
                {menuOpen && (
                    <div className="absolute bottom-8 right-1 bg-white border shadow-md rounded p-2 z-10">
                        <button
                            className="block w-full text-left text-sm hover:bg-gray-100 p-1"
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                        <button
                            className="block w-full text-left text-sm hover:bg-gray-100 p-1 text-red-500"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Message;
