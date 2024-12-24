import React from 'react';

function ConversationSearch() {
    return (
        <div className="grid items-center bg-blue-600 p-5 shadow-md">
            <input 
                type="text" 
                placeholder="Search" 
                className="text-gray-300 outline-none font-bold rounded-sm h-8 border-0 pl-4 pr-5 -mr-28 text-lg bg-[rgba(255,255,255,0.3)] placeholder:text-gray-100"
            />
        </div>
    );
}

export default ConversationSearch;
