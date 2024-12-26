import React, { useContext, useState } from 'react';
import { ConversationsContext } from '../../../reducers/ConversationsContext';

function ConversationSearch() {
    const { dispatch } = useContext(ConversationsContext);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        // Dispatch the search term to the context
        dispatch({ type: 'SEARCH_CONVERSATION', searchTerm: term });
    };

    return (
        <div className="grid items-center bg-blue-600 p-5 shadow-md">
            <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={handleSearch}
                className="text-gray-300 outline-none rounded-sm h-8 border-0 pl-4 pr-5 -mr-28 text-lg bg-[rgba(255,255,255,0.3)] placeholder:text-gray-100"
            />
        </div>
    );
}

export default ConversationSearch;
