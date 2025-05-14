import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { MyStore } from "@/components/merchant/my-store"

export default function MerchantMyStorePage() {
  return (
    <DashboardLayout role="merchant">
      <MyStore />
    </DashboardLayout>
  )
}
