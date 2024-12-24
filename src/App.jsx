import React from 'react';
import ChatShell from './container/shell/ChatShell';
import { ConversationsProvider } from './reducers/ConversationsContext';

const App = () => {
    return (
        <ConversationsProvider>
            <ChatShell />
        </ConversationsProvider>
    );
};

export default App;
