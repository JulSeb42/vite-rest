/*=============================================== Auth context ===============================================*/

import { useState, useEffect, createContext } from "react"

import { authService } from "api"

import type { AuthContextType } from "context/types"

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProviderWrapper = ({ children }: Props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)

    const loginUser = (token: string) => {
        localStorage.setItem("authToken", token)
        verifyStoredToken()
    }

    const setToken = (token: string) => {
        localStorage.setItem("authToken", token)
        setIsLoggedIn(true)
    }

    const logoutUser = () => {
        localStorage.removeItem("authToken")
        setIsLoggedIn(false)
        setUser(null)
    }

    const verifyStoredToken = () => {
        const storedToken = localStorage.getItem("authToken")

        if (storedToken) {
            authService
                .loggedIn({
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                })
                .then(res => {
                    const user = res.data.user
                    setUser(user)
                    setIsLoggedIn(true)
                    setIsLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setIsLoggedIn(false)
                    setUser(null)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        verifyStoredToken()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isLoading,
                user,
                setUser,
                loginUser,
                logoutUser,
                setToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

interface Props {
    children: any
}
