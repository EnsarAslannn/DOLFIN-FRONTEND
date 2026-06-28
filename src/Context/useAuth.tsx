import { createContext, useEffect, useState } from "react"
import type { UserProfile } from "../Models/User"
import { useNavigate } from "react-router"
import { loginAPI, registerAPI } from "../Services/AuthService"
import { toast } from "react-toastify"
import React from "react"
import axios from "axios"
import { axiosInstance } from "../Helpers/AxiosInstance"

type UserContextType = {
    user: UserProfile | null
    token: string | null
    registerUser: (email: string, username: string, password: string) => void
    loginUser: (username: string, password: string) => void
    logout: () => void
    isLoggedIn: () => boolean
    updateWalletBalance: (newBalance: number) => void
}

type Props = { children: React.ReactNode }

const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate()
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<UserProfile | null>(null)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const localUser = localStorage.getItem("user")
        const localToken = localStorage.getItem("token")
        if (localUser && localToken) {
            const parsedToken = localToken.trim()
            setUser(JSON.parse(localUser))
            setToken(parsedToken)
            axios.defaults.headers.common["Authorization"] = "Bearer " + parsedToken
            axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + parsedToken
        }
        setIsReady(true)
    }, [])

    const updateWalletBalance = (newBalance: number) => {
        const localUser = localStorage.getItem("user")
        if (localUser) {
            const parsedUser = JSON.parse(localUser)
            if (parsedUser.walletBalance !== newBalance) {
                parsedUser.walletBalance = newBalance
                localStorage.setItem("user", JSON.stringify(parsedUser))
                setUser(parsedUser)
            }
        }
    }

    const registerUser = async (email: string, username: string, password: string) => {
        await registerAPI(email, username, password)
            .then((res) => {
                if (res && res.data) {
                    const receivedToken = ((res.data as any).token || (res.data as any).Token).trim()
                    const receivedUserName = (res.data as any).userName || (res.data as any).UserName
                    const receivedEmail = (res.data as any).email || (res.data as any).Email
                    const receivedBalance = (res.data as any).walletBalance || (res.data as any).WalletBalance || 0

                    localStorage.setItem("token", receivedToken)
                    axios.defaults.headers.common["Authorization"] = "Bearer " + receivedToken
                    axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + receivedToken

                    const userObj = {
                        userName: receivedUserName,
                        email: receivedEmail,
                        walletBalance: receivedBalance,
                    }
                    localStorage.setItem("user", JSON.stringify(userObj))
                    setToken(receivedToken)
                    setUser(userObj)
                    toast.success("Registration Success!")

                    setTimeout(() => {
                        navigate("/search")
                    }, 50)
                }
            })
            .catch((e) => {
                console.error(e)
                toast.warning("Server error occurred")
            })
    }

    const loginUser = async (username: string, password: string) => {
        await loginAPI(username, password)
            .then((res) => {
                if (res && res.data) {
                    const receivedToken = ((res.data as any).token || (res.data as any).Token).trim()
                    const receivedUserName = (res.data as any).userName || (res.data as any).UserName
                    const receivedEmail = (res.data as any).email || (res.data as any).Email
                    const receivedBalance = (res.data as any).walletBalance || (res.data as any).WalletBalance || 0

                    localStorage.setItem("token", receivedToken)
                    axios.defaults.headers.common["Authorization"] = "Bearer " + receivedToken
                    axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + receivedToken

                    const userObj = {
                        userName: receivedUserName,
                        email: receivedEmail,
                        walletBalance: receivedBalance,
                    }
                    localStorage.setItem("user", JSON.stringify(userObj))
                    setToken(receivedToken)
                    setUser(userObj)
                    toast.success("Login Success!")

                    setTimeout(() => {
                        navigate("/search")
                    }, 50)
                }
            })
            .catch((e) => {
                console.error(e)
                toast.warning("Server error occurred")
            })
    }

    const isLoggedIn = () => {
        return !!user
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        if (axios.defaults.headers.common["Authorization"]) {
            delete axios.defaults.headers.common["Authorization"]
        }
        if (axiosInstance.defaults.headers.common["Authorization"]) {
            delete axiosInstance.defaults.headers.common["Authorization"]
        }
        setUser(null)
        setToken(null)
        navigate("/")
    }

    return (
        <UserContext.Provider
            value={{ loginUser, user, token, logout, isLoggedIn, registerUser, updateWalletBalance }}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    )
}

export const useAuth = () => React.useContext(UserContext)