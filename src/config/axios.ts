import axios from "axios"

const baseURL = import.meta.env.VITE_BASE_URL ?? "https://hermes.dcism.org"

export const api = axios.create({
  withCredentials: true,
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

// response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error)
    return Promise.reject(error)
  },
)
