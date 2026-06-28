import axios from "axios"

let apiBaseURL = import.meta.env.VITE_API_URL || "https://localhost:7109"
if (apiBaseURL.endsWith("/")) {
    apiBaseURL = apiBaseURL.slice(0, -1)
}

export const axiosInstance = axios.create({
    baseURL: apiBaseURL
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")

        if (token && token.trim() !== "") {
            config.headers["Authorization"] = `Bearer ${token.trim()}`
        } else if (axios.defaults.headers.common["Authorization"]) {
            config.headers["Authorization"] = axios.defaults.headers.common["Authorization"]
        }

        config.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        config.headers["Pragma"] = "no-cache"
        config.headers["Expires"] = "0"
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)