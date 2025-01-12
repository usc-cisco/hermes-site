import axios from "axios"

export const api = axios.create({
  withCredentials: true,
  baseURL: "https://hermes.dcism.org",
  headers: {
    "Content-Type": "application/json",
    // Add any required headers here
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
