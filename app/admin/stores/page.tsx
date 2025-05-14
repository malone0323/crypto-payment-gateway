import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AdminStores } from "@/components/admin/stores"

export default function AdminStoresPage() {
  return (
    <DashboardLayout role="admin">
      <AdminStores />
    </DashboardLayout>
  )
}
