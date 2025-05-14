import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { MerchantStores } from "@/components/merchant/stores"

export default function MerchantStoresPage() {
  return (
    <DashboardLayout role="merchant">
      <MerchantStores />
    </DashboardLayout>
  )
}
