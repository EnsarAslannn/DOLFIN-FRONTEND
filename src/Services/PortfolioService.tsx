import { axiosInstance } from "../Helpers/AxiosInstance"
import type { PortfolioGet } from "../Models/Portfolio"
import { handleError } from "../Helpers/ErrorHandler"

export const portfolioAddAPI = async (symbol: string, quantity: number) => {
    try {
        const data = await axiosInstance.post<{ message: string; newBalance: number }>(
            "/api/portfolio",
            null,
            {
                params: { symbol, quantity }
            }
        )
        return data
    } catch (error) {
        handleError(error)
    }
}

export const portfolioSellAPI = async (symbol: string, quantity: number) => {
    try {
        const data = await axiosInstance.post<{ message: string; newBalance: number }>(
            "/api/portfolio/sell",
            null,
            {
                params: { symbol, quantity }
            }
        )
        return data
    } catch (error) {
        handleError(error)
    }
}

export const portfolioGetAPI = async () => {
    try {
        const data = await axiosInstance.get<PortfolioGet[]>("/api/portfolio")
        return data
    } catch (error) {
        handleError(error)
    }
}

export const portfolioDepositAPI = async (amount: number) => {
    try {
        const data = await axiosInstance.post<{ message: string; newBalance: number }>(
            "/api/portfolio/deposit",
            null,
            {
                params: { amount }
            }
        )
        return data
    } catch (error) {
        handleError(error)
    }
}

export const portfolioWithdrawAPI = async (amount: number) => {
    try {
        const data = await axiosInstance.post<{ message: string; newBalance: number }>(
            "/api/portfolio/withdraw",
            null,
            {
                params: { amount }
            }
        )
        return data
    } catch (error) {
        handleError(error)
    }
}

export const marketTrendsAPI = async () => {
    try {
        const data = await axiosInstance.get<any[]>("/api/stock/trends")
        return data
    } catch (error) {
        handleError(error)
    }
}