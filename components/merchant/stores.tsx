"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Search, Plus } from "lucide-react"

// Mock stores data
const stores = [
  { id: 1, name: "Main Store", status: "active", transactions: 523, revenue: "$12,450.00" },
  { id: 2, name: "Online Shop", status: "active", transactions: 342, revenue: "$8,765.50" },
  { id: 3, name: "Mobile App", status: "active", transactions: 187, revenue: "$4,321.75" },
  { id: 4, name: "Test Store", status: "inactive", transactions: 12, revenue: "$150.25" },
  { id: 5, name: "Partner Store", status: "active", transactions: 98, revenue: "$2,345.00" },
]

export function MerchantStores() {
  const [searchTerm, setSearchTerm] = useState("")
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false)
  const [newStore, setNewStore] = useState({ name: "", description: "" })

  const filteredStores = stores.filter((store) => store.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-[#28A745]"
      case "inactive":
        return "bg-gray-100 text-[#6C757D]"
      case "banned":
        return "bg-red-100 text-[#DC3545]"
      default:
        return "bg-gray-100 text-[#6C757D]"
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-[#212529]">Stores</h1>
        <p className="text-[#6C757D]">Manage your payment gateway stores</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6C757D]" size={18} />
          <Input
            placeholder="Search stores..."
            className="pl-10 border-[#6C757D] focus:border-[#007BFF]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          className="w-full sm:w-auto bg-[#007BFF] hover:bg-[#0069d9] transition-transform duration-200 hover:scale-105"
          onClick={() => setRegisterDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Register Store
        </Button>
      </div>

      <Card className="animate-fadeIn [animation-delay:0.2s]">
        <CardHeader>
          <CardTitle>Your Stores</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Transactions</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStores.length > 0 ? (
                filteredStores.map((store, index) => (
                  <TableRow key={store.id} className="animate-fadeIn" style={{ animationDelay: `${0.1 * index}s` }}>
                    <TableCell className="font-medium">{store.name}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(store.status)}>{store.status.toUpperCase()}</Badge>
                    </TableCell>
                    <TableCell>{store.transactions}</TableCell>
                    <TableCell>{store.revenue}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-[#007BFF]">
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="text-[#6C757D]">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-[#6C757D]">
                    No stores found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Register Store Dialog */}
      <Dialog open={registerDialogOpen} onOpenChange={setRegisterDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Register New Store</DialogTitle>
            <DialogDescription>Add a new store to your payment gateway account.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="store-name" className="text-right">
                Store Name
              </Label>
              <Input
                id="store-name"
                className="col-span-3"
                value={newStore.name}
                onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="store-description" className="text-right">
                Description
              </Label>
              <textarea
                id="store-description"
                className="col-span-3 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={newStore.description}
                onChange={(e) => setNewStore({ ...newStore, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRegisterDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#007BFF] hover:bg-[#0069d9]"
              onClick={() => {
                // Handle store registration logic
                setRegisterDialogOpen(false)
              }}
            >
              Register Store
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
