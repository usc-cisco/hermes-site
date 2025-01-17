import { Announcement } from "../entities/Announcement"

export const announcements: Announcement[] = [
  {
    id: 1,
    date: new Date("2025-01-14"),
    points: [
      "Adjustment requests to only change schedule will not be catered to at all. Only requests to add or remove classes will be catered to.",
      "The physical queue will take priority over the digital queue. Please do not use the digital queue if you are already in the physical queue.",
    ],
  },
]
