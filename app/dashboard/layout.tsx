import React from "react"
import DashboardNavbar from "@/components/dashboard-navbar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <DashboardNavbar />
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
    </div>
  )
}
