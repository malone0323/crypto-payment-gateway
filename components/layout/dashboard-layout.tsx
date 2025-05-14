import type React from "react"
import { Sidebar } from "@/components/layout/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: "merchant" | "admin"
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar role={role} />
      <div className="md:ml-64 min-h-screen transition-all duration-300">
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
