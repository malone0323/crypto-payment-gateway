"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Store,
  Edit,
  BarChart3,
  Globe,
  ShoppingCart,
  Settings,
  Copy,
  Check,
  AlertCircle,
  Wallet,
  ArrowUpRight,
} from "lucide-react"

// Mock store data
const storeData = {
  id: "store_1",
  name: "My Crypto Shop",
  description: "Online store for digital products and services",
  status: "active",
  createdAt: "2023-01-15",
  apiKey: "pk_live_51HG8h4JHs7aJnPXXXXXXXXXX",
  url: "https://mystore.example.com",
  walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  balance: "$1,245.50",
  pendingBalance: "$178.25",
  transactions: {
    total: 523,
    completed: 498,
    failed: 25,
    pending: 12,
  },
  settings: {
    autoWithdraw: true,
    notifyOnSale: true,
    testMode: false,
  },
}

export function MyStore() {
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [store, setStore] = useState(storeData)
  const [editedStore, setEditedStore] = useState(storeData)
  const [activeTab, setActiveTab] = useState("overview")
  const [copiedKey, setCopiedKey] = useState(false)

  // Recent transactions mock data
  const recentTransactions = [
    { id: 1, date: "2023-01-15", amount: "$45.00", status: "completed" },
    { id: 2, date: "2023-01-14", amount: "$78.50", status: "completed" },
    { id: 3, date: "2023-01-14", amount: "$32.99", status: "failed" },
    { id: 4, date: "2023-01-13", amount: "$19.99", status: "completed" },
  ]

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleCopyKey = () => {
    navigator.clipboard.writeText(store.apiKey)
    setCopiedKey(true)
    setTimeout(() => setCopiedKey(false), 2000)
  }

  const handleSaveChanges = () => {
    setStore(editedStore)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedStore(store)
    setIsEditing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-crypto-green dark:bg-green-900/20"
      case "inactive":
        return "bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-400"
      case "banned":
        return "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-400"
    }
  }

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-crypto-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Store</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your 320 Pay store</p>
        </div>

        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} className="bg-crypto-blue hover:bg-crypto-blue/90 text-white">
            <Edit className="mr-2 h-4 w-4" />
            Edit Store
          </Button>
        )}
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 border-0 shadow-md dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center">
                    <Store className="mr-2 h-5 w-5 text-crypto-blue" />
                    {isEditing ? (
                      <Input
                        value={editedStore.name}
                        onChange={(e) => setEditedStore({ ...editedStore, name: e.target.value })}
                        className="mt-1 border-gray-300 dark:border-gray-700 focus:border-crypto-purple"
                      />
                    ) : (
                      store.name
                    )}
                  </CardTitle>
                  <CardDescription>
                    {isEditing ? (
                      <Textarea
                        value={editedStore.description}
                        onChange={(e) => setEditedStore({ ...editedStore, description: e.target.value })}
                        className="mt-1 min-h-[80px] border-gray-300 dark:border-gray-700 focus:border-crypto-purple"
                      />
                    ) : (
                      store.description
                    )}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(store.status)}>{store.status.toUpperCase()}</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Store URL</p>
                      {isEditing ? (
                        <Input
                          value={editedStore.url}
                          onChange={(e) => setEditedStore({ ...editedStore, url: e.target.value })}
                          className="mt-1 border-gray-300 dark:border-gray-700 focus:border-crypto-purple"
                        />
                      ) : (
                        <p className="text-base text-gray-900 dark:text-gray-300 flex items-center">
                          <Globe className="mr-2 h-4 w-4 text-crypto-blue" />
                          <a
                            href={store.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-crypto-blue hover:underline"
                          >
                            {store.url}
                          </a>
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created On</p>
                      <p className="text-base text-gray-900 dark:text-gray-300">{store.createdAt}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Connected Wallet</p>
                    <p className="text-base text-gray-900 dark:text-gray-300 flex items-center">
                      <Wallet className="mr-2 h-4 w-4 text-crypto-purple" />
                      <span className="font-mono">
                        {store.walletAddress.substring(0, 6)}...
                        {store.walletAddress.substring(store.walletAddress.length - 4)}
                      </span>
                    </p>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-3 pt-4">
                      <Button variant="outline" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveChanges} className="bg-crypto-blue hover:bg-crypto-blue/90 text-white">
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">Store Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Available Balance</p>
                    <p className="text-3xl font-bold text-crypto-green">{store.balance}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
                    <p className="text-xl text-gray-600 dark:text-gray-300">{store.pendingBalance}</p>
                  </div>

                  <Button className="w-full bg-crypto-green hover:bg-crypto-green/90 text-white">Withdraw Funds</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-md dark:bg-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5 text-crypto-blue" />
                  Total Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-crypto-blue">{store.transactions.total}</div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Completed</p>
                    <p className="text-lg font-semibold text-crypto-green">{store.transactions.completed}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Failed</p>
                    <p className="text-lg font-semibold text-red-500">{store.transactions.failed}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Pending</p>
                    <p className="text-lg font-semibold text-amber-500">{store.transactions.pending}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 border-0 shadow-md dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-crypto-blue" />
                  Recent Transactions
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-crypto-blue hover:text-crypto-purple">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-md"
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full mr-3 ${tx.status === "completed" ? "bg-crypto-green" : "bg-red-500"}`}
                        ></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{tx.amount}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{tx.date}</p>
                        </div>
                      </div>
                      <Badge
                        className={
                          tx.status === "completed"
                            ? "bg-green-100 text-crypto-green dark:bg-green-900/20"
                            : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                        }
                      >
                        {tx.status === "completed" && <ArrowUpRight className="mr-1 h-3 w-3" />}
                        {tx.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integration Tab */}
        <TabsContent value="integration" className="space-y-6">
          <Card className="border-0 shadow-md dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 dark:text-white">API Integration</CardTitle>
              <CardDescription>
                Use these credentials to integrate 320 Pay with your website or application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex">
                  <Input
                    id="api-key"
                    value={store.apiKey}
                    readOnly
                    className="flex-1 font-mono border-gray-300 dark:border-gray-700 focus:border-crypto-purple"
                  />
                  <Button onClick={handleCopyKey} className="ml-2 bg-crypto-blue hover:bg-crypto-blue/90 text-white">
                    {copiedKey ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span className="ml-2">{copiedKey ? "Copied" : "Copy"}</span>
                  </Button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Keep this key secret. Do not share it in public repositories or client-side code.
                </p>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-400">Test Mode</p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Your store is currently in {store.settings.testMode ? "test" : "live"} mode.
                    {store.settings.testMode
                      ? " No real transactions will be processed."
                      : " Real transactions will be processed."}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Integration Examples</h3>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">HTML Button</p>
                  <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto text-xs">
                    {`<button 
  onclick="window.open('https://320pay.com/pay/${store.id}', '_blank')"
  class="pay-button"
>
  Pay with Crypto
</button>`}
                  </pre>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">JavaScript</p>
                  <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto text-xs">
                    {`// Initialize 320 Pay
const pay320 = new Pay320('${store.apiKey}');

// Create a payment
pay320.createPayment({
  amount: '50.00',
  currency: 'USD',
  description: 'Order #1234',
  successUrl: 'https://yoursite.com/success',
  cancelUrl: 'https://yoursite.com/cancel'
}).then(response => {
  window.location = response.paymentUrl;
});`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <Card className="border-0 shadow-md dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 dark:text-white">Transaction History</CardTitle>
              <CardDescription>View all transactions processed through your store</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                For detailed transaction history, please visit the Transactions page.
              </p>
              <div className="flex justify-center">
                <Button
                  onClick={() => (window.location.href = "/merchant/transactions")}
                  className="bg-crypto-blue hover:bg-crypto-blue/90 text-white"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View All Transactions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="border-0 shadow-md dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center">
                <Settings className="mr-2 h-5 w-5 text-crypto-blue" />
                Store Settings
              </CardTitle>
              <CardDescription>Configure your store preferences and notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-withdraw">Automatic Withdrawals</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Automatically withdraw funds to your wallet when balance exceeds $100
                    </p>
                  </div>
                  <Switch
                    id="auto-withdraw"
                    checked={store.settings.autoWithdraw}
                    onCheckedChange={(checked) =>
                      setStore({ ...store, settings: { ...store.settings, autoWithdraw: checked } })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-sale">Sale Notifications</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive email notifications for each successful sale
                    </p>
                  </div>
                  <Switch
                    id="notify-sale"
                    checked={store.settings.notifyOnSale}
                    onCheckedChange={(checked) =>
                      setStore({ ...store, settings: { ...store.settings, notifyOnSale: checked } })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="test-mode">Test Mode</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enable test mode to process simulated transactions
                    </p>
                  </div>
                  <Switch
                    id="test-mode"
                    checked={store.settings.testMode}
                    onCheckedChange={(checked) =>
                      setStore({ ...store, settings: { ...store.settings, testMode: checked } })
                    }
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full bg-crypto-blue hover:bg-crypto-blue/90 text-white">Save Settings</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-red-200 dark:border-red-900/50 shadow-md dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-red-600 dark:text-red-400">Danger Zone</CardTitle>
              <CardDescription>Actions here can't be undone. Please proceed with caution.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="destructive" className="w-full">
                Deactivate Store
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
