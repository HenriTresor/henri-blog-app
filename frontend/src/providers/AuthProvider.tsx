import { createContext, useState } from "react"

export type User = {
    name: string,
    email: string,
    id: string
}

type defaultType = {
    authenticated: boolean,
    user: User | null,
    setAuthenticated: (vl: boolean) => void,
    setUser: (vl: User) => void
}

export const AuthContext = createContext<defaultType>({
    authenticated: false,
    user: null,
    setAuthenticated: () => { },
    setUser: () => { },

})


function AuthProvider({ children }: { children: React.ReactNode }) {
    const [authenticated, setAuthenticated] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    const value: defaultType = {
        authenticated, setAuthenticated,
        user, setUser
    }
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider