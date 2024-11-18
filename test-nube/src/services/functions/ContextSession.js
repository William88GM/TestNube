import { createContext, useContext, useState } from "react"


export const ContextSessionProvider = createContext()


export default function ContextSession({ children }) {
    const [session, setSession] = useState(null)
    return (
        <ContextSessionProvider.Provider value={{ session, setSession }}>
            {children}
        </ContextSessionProvider.Provider>
    )
}
