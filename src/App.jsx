import React, { useReducer } from 'react';
import ChatShell from './container/shell/ChatShell';
import { initialState, conversationsReducer } from './reducers/ConversationsContext';

export const ConversationsContext = React.createContext();

const App = () => {
    const [state, dispatch] = useReducer(conversationsReducer, initialState);

    return (
        <ConversationsContext.Provider value={{ state, dispatch }}>
            <ChatShell />
        </ConversationsContext.Provider>
    );
};

export default App;
