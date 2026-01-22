import { AxiosError } from "axios"

import { api } from "../config/axios"
import { Announcement } from "../types/entities/Announcement"

export class AnnouncementService {
  static async getAnnouncements(): Promise<Announcement[]> {
    try {
      const response = await api.get<Announcement[]>("announcement")
      // Convert date strings to Date objects, handle invalid dates
      return response.data.map((announcement) => {
        const date = announcement.date instanceof Date ? announcement.date : new Date(announcement.date)
        // If date is invalid, use current date as fallback
        const validDate = isNaN(date.getTime()) ? new Date() : date
        return {
          ...announcement,
          date: validDate,
        }
      })
    } catch (error) {
      console.error("Error fetching announcements:", error)
      // Return empty array instead of throwing to prevent page crash
      return []
    }
  }

  static async addAnnouncement(text: string, basicAuthToken: string): Promise<{ success?: boolean; error?: string }> {
    try {
      // Each announcement is its own bullet point, so wrap in array
      const response = await api.post(
        "announcement/admin",
        { text },
        {
          headers: {
            Authorization: `Basic ${basicAuthToken}`,
          },
        },
      )

      return response.data
    } catch (error) {
      console.error("Error adding announcement:", error)
      if (error instanceof AxiosError && error.response) {
        return { error: error.response.data.error || "Failed to add announcement" }
      }
      return { error: error instanceof Error ? error.message : "Failed to add announcement" }
    }
  }

  static async deleteAnnouncement(id: number, basicAuthToken: string): Promise<{ success?: boolean; error?: string }> {
    try {
      const response = await api.delete(`announcement/admin/${id}`, {
        headers: {
          Authorization: `Basic ${basicAuthToken}`,
        },
      })

      return response.data
    } catch (error) {
      console.error("Error deleting announcement:", error)
      if (error instanceof AxiosError && error.response) {
        return { error: error.response.data.error || "Failed to delete announcement" }
      }
      return { error: error instanceof Error ? error.message : "Failed to delete announcement" }
    }
  }
}
