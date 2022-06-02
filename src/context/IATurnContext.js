import { createContext, useState } from 'react';

export const IATurnContext = createContext({ IATurn: false, setIATurn: () => { } });

export const IATurnProvider = ({ children }) => {
    const [IATurn, setIATurn] = useState(false);
    const value = { IATurn, setIATurn };
    return (
        <IATurnContext.Provider value={value}>
            {children}
        </IATurnContext.Provider>
    )
}