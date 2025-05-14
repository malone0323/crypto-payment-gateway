import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { MerchantSettings } from "@/components/merchant/settings"

export default function MerchantSettingsPage() {
  return (
    <DashboardLayout role="merchant">
      <MerchantSettings />
    </DashboardLayout>
  )
}
