import { createContext, useState } from 'react';

export const historyContext = createContext({ history: [], setHistory: () => { } });

export const HistoryProvider = ({ children }) => {
    const [history, setHistory] = useState([]);
    const value = { history, setHistory };
    return (
        <historyContext.Provider value={value}>
            {children}
        </historyContext.Provider>
    )
}