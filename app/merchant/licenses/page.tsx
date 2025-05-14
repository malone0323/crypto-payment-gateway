import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { MerchantLicenses } from "@/components/merchant/licenses"

export default function MerchantLicensesPage() {
  return (
    <DashboardLayout role="merchant">
      <MerchantLicenses />
    </DashboardLayout>
  )
}
