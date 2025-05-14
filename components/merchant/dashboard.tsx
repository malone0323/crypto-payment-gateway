"use client"

import { useState, useEffect } from "react"
import { Store, Key, DollarSign, ShoppingCart, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { MetricCard } from "@/components/ui/metric-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for the chart
const revenueData = [
  { date: "2023-01-01", amount: 120 },
  { date: "2023-01-02", amount: 145 },
  { date: "2023-01-03", amount: 132 },
  { date: "2023-01-04", amount: 167 },
  { date: "2023-01-05", amount: 159 },
  { date: "2023-01-06", amount: 187 },
  { date: "2023-01-07", amount: 210 },
  { date: "2023-01-08", amount: 178 },
  { date: "2023-01-09", amount: 197 },
  { date: "2023-01-10", amount: 230 },
  { date: "2023-01-11", amount: 245 },
  { date: "2023-01-12", amount: 267 },
  { date: "2023-01-13", amount: 253 },
  { date: "2023-01-14", amount: 278 },
  { date: "2023-01-15", amount: 290 },
]

// Mock data for transactions
const transactions = [
  { id: 1, date: "2023-01-15", amount: "$245.00", status: "completed", store: "Main Store" },
  { id: 2, date: "2023-01-14", amount: "$178.50", status: "completed", store: "Online Shop" },
  { id: 3, date: "2023-01-14", amount: "$32.99", status: "failed", store: "Main Store" },
  { id: 4, date: "2023-01-13", amount: "$89.99", status: "completed", store: "Mobile App" },
  { id: 5, date: "2023-01-12", amount: "$126.50", status: "completed", store: "Online Shop" },
]

export function MerchantDashboard() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-crypto-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">320 Pay Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's an overview of your payment gateway.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Store Status"
          value="Active"
          icon={<Store size={24} className="text-crypto-blue" />}
          color="text-crypto-blue"
          className="animate-fadeIn [animation-delay:0.1s]"
        />
        <MetricCard
          title="License Status"
          value="Active"
          icon={<Key size={24} className="text-crypto-green" />}
          color="text-crypto-green"
          className="animate-fadeIn [animation-delay:0.2s]"
        />
        <MetricCard
          title="Daily Revenue"
          value="$245.00"
          icon={<DollarSign size={24} className="text-crypto-green" />}
          trend={{ value: 15, isPositive: true }}
          color="text-crypto-green"
          className="animate-fadeIn [animation-delay:0.3s]"
        />
        <MetricCard
          title="Total Transactions"
          value="1,234"
          icon={<ShoppingCart size={24} className="text-crypto-purple" />}
          trend={{ value: 8, isPositive: true }}
          color="text-crypto-purple"
          className="animate-fadeIn [animation-delay:0.4s]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 animate-fadeIn [animation-delay:0.5s] dark:bg-gray-800 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Revenue (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end">
              {revenueData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div className="relative">
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      ${item.amount}
                    </div>
                    <div
                      className="w-full max-w-[20px] bg-gradient-to-t from-crypto-blue to-crypto-purple rounded-t-sm animate-growUp"
                      style={{
                        height: `${(item.amount / 300) * 250}px`,
                        animationDelay: `${0.1 * index}s`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{new Date(item.date).getDate()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fadeIn [animation-delay:0.6s] dark:bg-gray-800 border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-gray-900 dark:text-white">Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm" className="text-crypto-blue hover:text-crypto-purple">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-500 dark:text-gray-400">Date</TableHead>
                  <TableHead className="text-gray-500 dark:text-gray-400">Amount</TableHead>
                  <TableHead className="text-gray-500 dark:text-gray-400">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id} className="border-b border-gray-100 dark:border-gray-700">
                    <TableCell className="text-gray-900 dark:text-gray-300">{tx.date}</TableCell>
                    <TableCell className="text-gray-900 dark:text-gray-300">{tx.amount}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          tx.status === "completed"
                            ? "bg-green-100 dark:bg-green-900/20 text-crypto-green"
                            : "bg-red-100 dark:bg-red-900/20 text-red-500"
                        }`}
                      >
                        {tx.status === "completed" ? (
                          <ArrowUpRight className="mr-1 h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="mr-1 h-3 w-3" />
                        )}
                        {tx.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
