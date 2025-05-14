"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, ChevronLeft, ChevronRight, Download, Filter, ArrowUpRight, ArrowDownRight } from "lucide-react"

// Mock transactions data
const transactions = [
  { id: 1, date: "2023-01-15", amount: "$245.00", status: "completed", store: "Main Store" },
  { id: 2, date: "2023-01-14", amount: "$178.50", status: "completed", store: "Online Shop" },
  { id: 3, date: "2023-01-14", amount: "$32.99", status: "failed", store: "Main Store" },
  { id: 4, date: "2023-01-13", amount: "$89.99", status: "completed", store: "Mobile App" },
  { id: 5, date: "2023-01-12", amount: "$126.50", status: "completed", store: "Online Shop" },
  { id: 6, date: "2023-01-11", amount: "$67.25", status: "completed", store: "Main Store" },
  { id: 7, date: "2023-01-10", amount: "$199.99", status: "pending", store: "Mobile App" },
  { id: 8, date: "2023-01-09", amount: "$45.75", status: "completed", store: "Online Shop" },
  { id: 9, date: "2023-01-08", amount: "$88.50", status: "failed", store: "Main Store" },
  { id: 10, date: "2023-01-07", amount: "$124.99", status: "completed", store: "Mobile App" },
]

// Mock stores for filter
const stores = [
  { id: 1, name: "All Stores" },
  { id: 2, name: "Main Store" },
  { id: 3, name: "Online Shop" },
  { id: 4, name: "Mobile App" },
]

export function MerchantTransactions() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedStore, setSelectedStore] = useState("All Stores")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(transactions.length / itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-[#28A745]"
      case "pending":
        return "bg-yellow-100 text-[#FFC107]"
      case "failed":
        return "bg-red-100 text-[#DC3545]"
      default:
        return "bg-gray-100 text-[#6C757D]"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <ArrowUpRight className="mr-1 h-3 w-3" />
      case "failed":
        return <ArrowDownRight className="mr-1 h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-[#212529]">Transactions</h1>
        <p className="text-[#6C757D]">View and manage your payment transactions</p>
      </div>

      <Card className="animate-fadeIn [animation-delay:0.1s]">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6C757D]" size={16} />
                <Input
                  id="start-date"
                  type="date"
                  className="pl-10 border-[#6C757D] focus:border-[#007BFF]"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6C757D]" size={16} />
                <Input
                  id="end-date"
                  type="date"
                  className="pl-10 border-[#6C757D] focus:border-[#007BFF]"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="store">Store</Label>
              <select
                id="store"
                className="w-full h-10 rounded-md border border-[#6C757D] focus:border-[#007BFF] px-3 py-2"
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
              >
                {stores.map((store) => (
                  <option key={store.id} value={store.name}>
                    {store.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <Button className="bg-[#007BFF] hover:bg-[#0069d9]">
              <Filter className="mr-2 h-4 w-4" /> Apply Filters
            </Button>
            <Button variant="outline" className="border-[#28A745] text-[#28A745] hover:bg-[#28A745] hover:text-white">
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fadeIn [animation-delay:0.2s]">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Store</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((tx, index) => (
                <TableRow key={tx.id} className="animate-fadeIn" style={{ animationDelay: `${0.1 * index}s` }}>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(tx.status)}`}
                    >
                      {getStatusIcon(tx.status)}
                      {tx.status}
                    </span>
                  </TableCell>
                  <TableCell>{tx.store}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-[#007BFF]">
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-[#6C757D]">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, transactions.length)} of{" "}
              {transactions.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? "bg-[#007BFF]" : ""}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
