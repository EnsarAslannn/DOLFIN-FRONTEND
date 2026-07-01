import axios from "axios"

const getApiURL = () => {
    let url = import.meta.env.VITE_API_URL || "https://localhost:7109"
    if (url.endsWith("/")) {
        url = url.slice(0, -1)
    }
    return `${url}/api/`
}

const axiosInstance = axios.create({
    baseURL: getApiURL(),
    headers: {
        "Content-Type": "application/json",
    },
})

axiosInstance.interceptors.request.use(
    (config) => {
        if (config.baseURL && config.baseURL.includes("localhost") && config.url) {
            if (config.url.startsWith("/api/")) {
                config.url = config.url.replace("/api/", "")
            } else if (config.url.startsWith("api/")) {
                config.url = config.url.replace("api/", "")
            }
            if (!config.url.startsWith("/")) {
                config.url = `/${config.url}`
            }
        }

        const userString = localStorage.getItem("user")
        if (userString) {
            const user = JSON.parse(userString)
            if (user && user.token) {
                config.headers.Authorization = `Bearer ${user.token}`
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

export default axiosInstance
