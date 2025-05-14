import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { MerchantDashboard } from "@/components/merchant/dashboard"

export default function MerchantDashboardPage() {
  return (
    <DashboardLayout role="merchant">
      <MerchantDashboard />
    </DashboardLayout>
  )
}
