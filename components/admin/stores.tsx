"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Store,
  MoreHorizontal,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  AlertTriangle,
  XCircle,
  DollarSign,
  BarChart3,
  Calendar,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
} from "lucide-react"

// Mock stores data
const storesData = [
  {
    id: "store_1",
    name: "Crypto Gadgets",
    owner: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    ownerName: "John Merchant",
    status: "active",
    createdAt: "2023-01-15",
    transactions: 523,
    revenue: "$12,450.00",
    lastTransaction: "2023-01-15",
    url: "https://cryptogadgets.com",
    balance: "$1,245.50",
    pendingBalance: "$178.25",
  },
  {
    id: "store_2",
    name: "NFT Marketplace",
    owner: "0x3Dc6F5F4Cc7x2E7B8A9C0D1E2F3A4B5C6D7E8F9A",
    ownerName: "Alice Trader",
    status: "active",
    createdAt: "2023-01-10",
    transactions: 342,
    revenue: "$8,765.50",
    lastTransaction: "2023-01-14",
    url: "https://nftmarketplace.io",
    balance: "$876.50",
    pendingBalance: "$120.00",
  },
  {
    id: "store_3",
    name: "Crypto Academy",
    owner: "0x9A8B7C6D5E4F3G2H1I0J9K8L7M6N5O4P3Q2R1S0",
    ownerName: "Bob Educator",
    status: "active",
    createdAt: "2023-01-05",
    transactions: 187,
    revenue: "$4,321.75",
    lastTransaction: "2023-01-13",
    url: "https://cryptoacademy.edu",
    balance: "$432.20",
    pendingBalance: "$0.00",
  },
  {
    id: "store_4",
    name: "Test Store",
    owner: "0x1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0",
    ownerName: "Test User",
    status: "inactive",
    createdAt: "2022-12-20",
    transactions: 12,
    revenue: "$150.25",
    lastTransaction: "2022-12-25",
    url: "https://teststore.dev",
    balance: "$0.00",
    pendingBalance: "$0.00",
  },
  {
    id: "store_5",
    name: "Crypto Gaming",
    owner: "0x0Z9Y8X7W6V5U4T3S2R1Q0P9O8N7M6L5K4J3I2H1",
    ownerName: "Charlie Gamer",
    status: "suspended",
    createdAt: "2022-12-15",
    transactions: 98,
    revenue: "$2,345.00",
    lastTransaction: "2023-01-01",
    url: "https://cryptogaming.gg",
    balance: "$234.50",
    pendingBalance: "$0.00",
  },
  {
    id: "store_6",
    name: "DeFi Solutions",
    owner: "0x1Z2Y3X4W5V6U7T8S9R0Q1P2O3N4M5L6K7J8I9H0",
    ownerName: "Dave Finance",
    status: "active",
    createdAt: "2022-12-10",
    transactions: 421,
    revenue: "$9,876.30",
    lastTransaction: "2023-01-14",
    url: "https://defisolutions.finance",
    balance: "$987.60",
    pendingBalance: "$145.75",
  },
  {
    id: "store_7",
    name: "Blockchain Consulting",
    owner: "0x2A3B4C5D6E7F8G9H0I1J2K3L4M5N6O7P8Q9R0S1",
    ownerName: "Eve Consultant",
    status: "active",
    createdAt: "2022-12-05",
    transactions: 156,
    revenue: "$7,654.25",
    lastTransaction: "2023-01-12",
    url: "https://blockchainconsulting.pro",
    balance: "$765.40",
    pendingBalance: "$89.30",
  },
]

// Mock transaction data for store details
const storeTransactions = [
  { id: 1, date: "2023-01-15", amount: "$245.00", status: "completed", type: "payment" },
  { id: 2, date: "2023-01-14", amount: "$178.50", status: "completed", type: "payment" },
  { id: 3, date: "2023-01-14", amount: "$32.99", status: "failed", type: "payment" },
  { id: 4, date: "2023-01-13", amount: "$89.99", status: "completed", type: "payment" },
  { id: 5, date: "2023-01-12", amount: "$126.50", status: "completed", type: "payment" },
  { id: 6, date: "2023-01-10", amount: "$500.00", status: "completed", type: "withdrawal" },
]

export function AdminStores() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStore, setSelectedStore] = useState<any>(null)
  const [isStoreDetailsOpen, setIsStoreDetailsOpen] = useState(false)
  const [isEditStoreOpen, setIsEditStoreOpen] = useState(false)
  const [isSuspendStoreOpen, setIsSuspendStoreOpen] = useState(false)
  const [editedStore, setEditedStore] = useState<any>(null)
  const [suspensionReason, setSuspensionReason] = useState("")

  const itemsPerPage = 5

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter and sort stores
  const filteredStores = storesData
    .filter((store) => {
      // Apply search filter
      const matchesSearch =
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.owner.toLowerCase().includes(searchTerm.toLowerCase())

      // Apply status filter
      const matchesStatus = statusFilter === "all" || store.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      // Apply sorting
      let comparison = 0

      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "revenue":
          comparison =
            Number.parseFloat(a.revenue.replace("$", "").replace(",", "")) -
            Number.parseFloat(b.revenue.replace("$", "").replace(",", ""))
          break
        case "transactions":
          comparison = a.transactions - b.transactions
          break
        case "date":
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
        default:
          comparison = a.name.localeCompare(b.name)
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredStores.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredStores.length / itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-crypto-green dark:bg-green-900/20"
      case "inactive":
        return "bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-400"
      case "suspended":
        return "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 mr-1" />
      case "inactive":
        return <AlertTriangle className="h-4 w-4 mr-1" />
      case "suspended":
        return <XCircle className="h-4 w-4 mr-1" />
      default:
        return null
    }
  }

  const handleViewStore = (store: any) => {
    setSelectedStore(store)
    setIsStoreDetailsOpen(true)
  }

  const handleEditStore = (store: any) => {
    setSelectedStore(store)
    setEditedStore({ ...store })
    setIsEditStoreOpen(true)
  }

  const handleSuspendStore = (store: any) => {
    setSelectedStore(store)
    setSuspensionReason("")
    setIsSuspendStoreOpen(true)
  }

  const handleSaveEdit = () => {
    // In a real app, save the edited store to the backend
    // For now, just close the dialog
    setIsEditStoreOpen(false)
  }

  const handleConfirmSuspension = () => {
    // In a real app, suspend the store in the backend
    // For now, just close the dialog
    setIsSuspendStoreOpen(false)
  }

  const shortenAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Stores Management</h1>
        <p className="text-gray-600 dark:text-gray-400">View and manage all merchant stores on the 320 Pay platform</p>
      </div>

      {/* Filters and Search */}
      <Card className="border-0 shadow-md dark:bg-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="search">Search Stores</Label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  size={18}
                />
                <Input
                  id="search"
                  placeholder="Search by name, owner, or wallet address..."
                  className="pl-10 border-gray-300 dark:border-gray-700 focus:border-crypto-purple"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full md:w-48 space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status" className="border-gray-300 dark:border-gray-700 focus:border-crypto-purple">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-48 space-y-2">
              <Label htmlFor="sort">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort" className="border-gray-300 dark:border-gray-700 focus:border-crypto-purple">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Store Name</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="transactions">Transactions</SelectItem>
                  <SelectItem value="date">Creation Date</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-48 space-y-2">
              <Label htmlFor="order">Order</Label>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger id="order" className="border-gray-300 dark:border-gray-700 focus:border-crypto-purple">
                  <SelectValue placeholder="Sort order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full md:w-auto bg-crypto-blue hover:bg-crypto-blue/90 text-white">
              <Filter className="mr-2 h-4 w-4" /> Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stores Table */}
      <Card className="border-0 shadow-md dark:bg-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-gray-900 dark:text-white">All Stores</CardTitle>
            <Button variant="outline" className="border-crypto-green text-crypto-green hover:bg-crypto-green/10">
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
          </div>
          <CardDescription>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredStores.length)} of{" "}
            {filteredStores.length} stores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Store Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Transactions</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.length > 0 ? (
                currentItems.map((store, index) => (
                  <TableRow key={store.id} className="animate-fadeIn" style={{ animationDelay: `${0.1 * index}s` }}>
                    <TableCell className="font-medium text-gray-900 dark:text-gray-200">{store.name}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-gray-900 dark:text-gray-200">{store.ownerName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                          {shortenAddress(store.owner)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(store.status)}>
                        <span className="flex items-center">
                          {getStatusIcon(store.status)}
                          {store.status.toUpperCase()}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell>{store.transactions}</TableCell>
                    <TableCell>{store.revenue}</TableCell>
                    <TableCell>{store.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleViewStore(store)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditStore(store)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit Store</span>
                          </DropdownMenuItem>
                          {store.status !== "suspended" ? (
                            <DropdownMenuItem
                              onClick={() => handleSuspendStore(store)}
                              className="text-red-600 dark:text-red-400"
                            >
                              <Ban className="mr-2 h-4 w-4" />
                              <span>Suspend Store</span>
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleSuspendStore(store)} className="text-crypto-green">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              <span>Reactivate Store</span>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No stores found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="text-crypto-blue border-crypto-blue hover:bg-crypto-blue/10"
              >
                Previous
              </Button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? "bg-crypto-blue hover:bg-crypto-blue/90"
                        : "text-crypto-blue border-crypto-blue hover:bg-crypto-blue/10"
                    }
                    size="sm"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="text-crypto-blue border-crypto-blue hover:bg-crypto-blue/10"
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Store Details Dialog */}
      {selectedStore && (
        <Dialog open={isStoreDetailsOpen} onOpenChange={setIsStoreDetailsOpen}>
          <DialogContent className="max-w-4xl bg-white dark:bg-gray-800 border-0 shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <Store className="mr-2 h-5 w-5 text-crypto-blue" />
                {selectedStore.name}
              </DialogTitle>
              <DialogDescription>Store ID: {selectedStore.id}</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Owner</h3>
                      <p className="text-base text-gray-900 dark:text-gray-200">{selectedStore.ownerName}</p>
                      <p className="text-xs font-mono text-gray-500 dark:text-gray-400">{selectedStore.owner}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</h3>
                      <Badge className={getStatusColor(selectedStore.status)}>
                        <span className="flex items-center">
                          {getStatusIcon(selectedStore.status)}
                          {selectedStore.status.toUpperCase()}
                        </span>
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Created On</h3>
                      <p className="text-base text-gray-900 dark:text-gray-200">{selectedStore.createdAt}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Store URL</h3>
                      <p className="text-base text-crypto-blue hover:underline">
                        <a href={selectedStore.url} target="_blank" rel="noopener noreferrer">
                          {selectedStore.url}
                        </a>
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Transactions</h3>
                      <p className="text-base text-gray-900 dark:text-gray-200">{selectedStore.transactions}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Transaction</h3>
                      <p className="text-base text-gray-900 dark:text-gray-200">{selectedStore.lastTransaction}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</h3>
                      <p className="text-xl font-bold text-crypto-green">{selectedStore.revenue}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Available Balance</h3>
                      <p className="text-base text-gray-900 dark:text-gray-200">{selectedStore.balance}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Balance</h3>
                      <p className="text-base text-gray-900 dark:text-gray-200">{selectedStore.pendingBalance}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => handleEditStore(selectedStore)}
                    className="text-crypto-blue border-crypto-blue hover:bg-crypto-blue/10"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Store
                  </Button>

                  {selectedStore.status !== "suspended" ? (
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setIsStoreDetailsOpen(false)
                        handleSuspendStore(selectedStore)
                      }}
                    >
                      <Ban className="mr-2 h-4 w-4" />
                      Suspend Store
                    </Button>
                  ) : (
                    <Button
                      className="bg-crypto-green hover:bg-crypto-green/90 text-white"
                      onClick={() => {
                        setIsStoreDetailsOpen(false)
                        handleSuspendStore(selectedStore)
                      }}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Reactivate Store
                    </Button>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="transactions" className="space-y-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {storeTransactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell>{tx.date}</TableCell>
                        <TableCell>{tx.amount}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {tx.type === "payment" ? (
                              <ArrowUpRight className="mr-1 h-3 w-3 text-crypto-green" />
                            ) : (
                              <ArrowDownRight className="mr-1 h-3 w-3 text-amber-500" />
                            )}
                            {tx.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              tx.status === "completed"
                                ? "bg-green-100 text-crypto-green dark:bg-green-900/20"
                                : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                            }
                          >
                            {tx.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex justify-center">
                  <Button className="bg-crypto-blue hover:bg-crypto-blue/90 text-white">View All Transactions</Button>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-0 shadow-md dark:bg-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <DollarSign className="mr-2 h-5 w-5 text-crypto-green" />
                        Revenue
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-crypto-green">{selectedStore.revenue}</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Total revenue generated</p>
                      <div className="h-24 mt-4 flex items-end">
                        {[35, 45, 25, 60, 75, 90, 65].map((value, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-crypto-green/50 to-crypto-green rounded-t mx-0.5"
                            style={{ height: `${value}%` }}
                          ></div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">Last 7 days</div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md dark:bg-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <BarChart3 className="mr-2 h-5 w-5 text-crypto-blue" />
                        Transactions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-crypto-blue">{selectedStore.transactions}</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Total transactions processed</p>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <div className="bg-gray-100 dark:bg-gray-600 p-3 rounded-md">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
                          <p className="text-lg font-semibold text-crypto-green">
                            {Math.round(selectedStore.transactions * 0.95)}
                          </p>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-600 p-3 rounded-md">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Failed</p>
                          <p className="text-lg font-semibold text-red-500">
                            {Math.round(selectedStore.transactions * 0.05)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md dark:bg-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-crypto-purple" />
                        Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-crypto-purple">
                        {new Date(selectedStore.lastTransaction).toLocaleDateString()}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Last transaction date</p>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-700 dark:text-gray-300">Daily Average</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {Math.round(selectedStore.transactions / 30)} tx
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-700 dark:text-gray-300">Monthly Volume</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            $
                            {Math.round(
                              Number.parseFloat(selectedStore.revenue.replace("$", "").replace(",", "")) / 3,
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-0 shadow-md dark:bg-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Wallet className="mr-2 h-5 w-5 text-crypto-blue" />
                      Payment Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="h-40 w-40 mx-auto">
                          <div className="relative h-full w-full rounded-full">
                            <div
                              className="absolute inset-0 rounded-full bg-crypto-blue"
                              style={{ clipPath: "polygon(0 0, 50% 0, 50% 50%, 0 50%)" }}
                            ></div>
                            <div
                              className="absolute inset-0 rounded-full bg-crypto-purple"
                              style={{ clipPath: "polygon(50% 0, 100% 0, 100% 50%, 50% 50%)" }}
                            ></div>
                            <div
                              className="absolute inset-0 rounded-full bg-crypto-green"
                              style={{ clipPath: "polygon(0 50%, 50% 50%, 50% 100%, 0 100%)" }}
                            ></div>
                            <div
                              className="absolute inset-0 rounded-full bg-amber-500"
                              style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)" }}
                            ></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="h-20 w-20 rounded-full bg-white dark:bg-gray-800"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-crypto-blue mr-2"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Ethereum</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">45% of transactions</p>
                          </div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            $
                            {Math.round(
                              Number.parseFloat(selectedStore.revenue.replace("$", "").replace(",", "")) * 0.45,
                            ).toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-crypto-purple mr-2"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Bitcoin</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">30% of transactions</p>
                          </div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            $
                            {Math.round(
                              Number.parseFloat(selectedStore.revenue.replace("$", "").replace(",", "")) * 0.3,
                            ).toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-crypto-green mr-2"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">USDC</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">15% of transactions</p>
                          </div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            $
                            {Math.round(
                              Number.parseFloat(selectedStore.revenue.replace("$", "").replace(",", "")) * 0.15,
                            ).toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Other</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">10% of transactions</p>
                          </div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            $
                            {Math.round(
                              Number.parseFloat(selectedStore.revenue.replace("$", "").replace(",", "")) * 0.1,
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Store Dialog */}
      {selectedStore && editedStore && (
        <Dialog open={isEditStoreOpen} onOpenChange={setIsEditStoreOpen}>
          <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-0 shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <Edit className="mr-2 h-5 w-5 text-crypto-blue" />
                Edit Store
              </DialogTitle>
              <DialogDescription>Update store information for {selectedStore.name}</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input
                  id="store-name"
                  value={editedStore.name}
                  onChange={(e) => setEditedStore({ ...editedStore, name: e.target.value })}
                  className="border-gray-300 dark:border-gray-700 focus:border-crypto-purple"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="store-url">Store URL</Label>
                <Input
                  id="store-url"
                  value={editedStore.url}
                  onChange={(e) => setEditedStore({ ...editedStore, url: e.target.value })}
                  className="border-gray-300 dark:border-gray-700 focus:border-crypto-purple"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="store-status">Status</Label>
                <Select
                  value={editedStore.status}
                  onValueChange={(value) => setEditedStore({ ...editedStore, status: value })}
                >
                  <SelectTrigger
                    id="store-status"
                    className="border-gray-300 dark:border-gray-700 focus:border-crypto-purple"
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditStoreOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit} className="bg-crypto-blue hover:bg-crypto-blue/90 text-white">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Suspend Store Dialog */}
      {selectedStore && (
        <Dialog open={isSuspendStoreOpen} onOpenChange={setIsSuspendStoreOpen}>
          <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-0 shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                {selectedStore.status !== "suspended" ? (
                  <>
                    <Ban className="mr-2 h-5 w-5 text-red-500" />
                    Suspend Store
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5 text-crypto-green" />
                    Reactivate Store
                  </>
                )}
              </DialogTitle>
              <DialogDescription>
                {selectedStore.status !== "suspended"
                  ? `Are you sure you want to suspend ${selectedStore.name}? This will prevent the store from processing new transactions.`
                  : `Are you sure you want to reactivate ${selectedStore.name}? This will allow the store to process transactions again.`}
              </DialogDescription>
            </DialogHeader>

            {selectedStore.status !== "suspended" && (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="suspension-reason">Reason for Suspension</Label>
                  <textarea
                    id="suspension-reason"
                    value={suspensionReason}
                    onChange={(e) => setSuspensionReason(e.target.value)}
                    className="w-full min-h-[100px] rounded-md border border-gray-300 dark:border-gray-700 focus:border-crypto-purple bg-white dark:bg-gray-800 p-2"
                    placeholder="Please provide a reason for suspending this store..."
                  />
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSuspendStoreOpen(false)}>
                Cancel
              </Button>
              {selectedStore.status !== "suspended" ? (
                <Button variant="destructive" onClick={handleConfirmSuspension}>
                  Suspend Store
                </Button>
              ) : (
                <Button
                  className="bg-crypto-green hover:bg-crypto-green/90 text-white"
                  onClick={handleConfirmSuspension}
                >
                  Reactivate Store
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
