"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Key, AlertCircle } from "lucide-react"

// Mock license data
const currentLicense = {
  key: "CRYPT-1234-5678-9ABC",
  expiryDate: "2023-12-31",
  status: "active", // active, expiring, expired
  daysLeft: 45,
}

const licenseHistory = [
  { key: "CRYPT-1234-5678-9ABC", startDate: "2023-01-01", expiryDate: "2023-12-31", status: "active" },
  { key: "CRYPT-9876-5432-DCBA", startDate: "2022-01-01", expiryDate: "2022-12-31", status: "expired" },
  { key: "CRYPT-ABCD-EFGH-IJKL", startDate: "2021-01-01", expiryDate: "2021-12-31", status: "expired" },
]

export function MerchantLicenses() {
  const [renewDialogOpen, setRenewDialogOpen] = useState(false)
  const [buyDialogOpen, setBuyDialogOpen] = useState(false)

  const getLicenseStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-[#28A745]"
      case "expiring":
        return "bg-yellow-100 text-[#FFC107]"
      case "expired":
        return "bg-red-100 text-[#DC3545]"
      default:
        return "bg-gray-100 text-[#6C757D]"
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-[#212529]">Licenses</h1>
        <p className="text-[#6C757D]">Manage your payment gateway licenses</p>
      </div>

      <Card className="border-[#007BFF] animate-fadeIn">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current License</CardTitle>
              <CardDescription>Your active payment gateway license</CardDescription>
            </div>
            <div className="p-3 rounded-full bg-[#007BFF20]">
              <Key className="h-6 w-6 text-[#007BFF]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium text-[#6C757D]">License Key</p>
                <p className="text-base font-mono">{currentLicense.key}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#6C757D]">Expiry Date</p>
                <p className="text-base">{currentLicense.expiryDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#6C757D]">Status</p>
                <Badge className={getLicenseStatusColor(currentLicense.status)}>
                  {currentLicense.status.toUpperCase()}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-[#6C757D]">Days Left</p>
                <p className="text-base">{currentLicense.daysLeft} days</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                className="bg-[#28A745] hover:bg-[#218838] transition-transform duration-200 hover:scale-105"
                onClick={() => setRenewDialogOpen(true)}
              >
                Renew License
              </Button>
              <Button
                className="bg-[#007BFF] hover:bg-[#0069d9] transition-transform duration-200 hover:scale-105"
                onClick={() => setBuyDialogOpen(true)}
              >
                Buy New License
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fadeIn [animation-delay:0.2s]">
        <CardHeader>
          <CardTitle>License History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>License Key</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {licenseHistory.map((license, index) => (
                <TableRow key={index} className="animate-fadeIn" style={{ animationDelay: `${0.1 * index}s` }}>
                  <TableCell className="font-mono">{license.key}</TableCell>
                  <TableCell>{license.startDate}</TableCell>
                  <TableCell>{license.expiryDate}</TableCell>
                  <TableCell>
                    <Badge className={getLicenseStatusColor(license.status)}>{license.status.toUpperCase()}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Renew License Dialog */}
      <Dialog open={renewDialogOpen} onOpenChange={setRenewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Renew Your License</DialogTitle>
            <DialogDescription>
              Extend your current license for continued access to our payment gateway.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-md">
              <AlertCircle className="h-5 w-5 text-[#007BFF]" />
              <div className="text-sm">
                Your current license will expire on <span className="font-medium">{currentLicense.expiryDate}</span>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration
              </Label>
              <select
                id="duration"
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="1">1 Year ($499)</option>
                <option value="2">2 Years ($899)</option>
                <option value="3">3 Years ($1299)</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenewDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#28A745] hover:bg-[#218838]"
              onClick={() => {
                // Handle renewal logic
                setRenewDialogOpen(false)
              }}
            >
              Proceed to Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Buy New License Dialog */}
      <Dialog open={buyDialogOpen} onOpenChange={setBuyDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Buy New License</DialogTitle>
            <DialogDescription>Purchase a new license for our payment gateway.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="license-type" className="text-right">
                License Type
              </Label>
              <select
                id="license-type"
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="standard">Standard ($499/year)</option>
                <option value="premium">Premium ($999/year)</option>
                <option value="enterprise">Enterprise ($1999/year)</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration
              </Label>
              <select
                id="duration"
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="1">1 Year</option>
                <option value="2">2 Years (10% discount)</option>
                <option value="3">3 Years (15% discount)</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBuyDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#007BFF] hover:bg-[#0069d9]"
              onClick={() => {
                // Handle purchase logic
                setBuyDialogOpen(false)
              }}
            >
              Proceed to Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
