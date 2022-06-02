import { createContext, useState } from 'react';

export const peonToEvolveContext = createContext({ peonToEvolve: null, setPeonToEvolve: () => { } });

export const PeonToEvolveProvider = ({ children }) => {
    const [peonToEvolve, setPeonToEvolve] = useState(null);
    const value = { peonToEvolve, setPeonToEvolve };
    return (
        <peonToEvolveContext.Provider value={value}>
            {children}
        </peonToEvolveContext.Provider>
    )
}