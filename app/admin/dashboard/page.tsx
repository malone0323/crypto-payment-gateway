import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AdminDashboard } from "@/components/admin/dashboard"

export default function AdminDashboardPage() {
  return (
    <DashboardLayout role="admin">
      <AdminDashboard />
    </DashboardLayout>
  )
}
