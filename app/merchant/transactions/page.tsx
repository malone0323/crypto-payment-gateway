import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { MerchantTransactions } from "@/components/merchant/transactions"

export default function MerchantTransactionsPage() {
  return (
    <DashboardLayout role="merchant">
      <MerchantTransactions />
    </DashboardLayout>
  )
}
