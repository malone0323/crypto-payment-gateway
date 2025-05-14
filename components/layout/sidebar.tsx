"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Key,
  Store,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Users,
  FileText,
  Wallet,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  role: "merchant" | "admin"
}

export function Sidebar({ role }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const merchantLinks = [
    { name: "Dashboard", href: "/merchant/dashboard", icon: LayoutDashboard },
    { name: "Licenses", href: "/merchant/licenses", icon: Key },
    { name: "My Store", href: "/merchant/my-store", icon: Store },
    { name: "Transactions", href: "/merchant/transactions", icon: BarChart3 },
    { name: "Settings", href: "/merchant/settings", icon: Settings },
  ]

  const adminLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Licenses", href: "/admin/licenses", icon: Key },
    { name: "Stores", href: "/admin/stores", icon: Store },
    { name: "Reports", href: "/admin/reports", icon: FileText },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  const links = role === "merchant" ? merchantLinks : adminLinks
  const basePath = role === "merchant" ? "/merchant" : "/admin"

  // Simulated wallet address
  const walletAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
  const shortenedAddress = `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-crypto-darkBlue text-white shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-crypto-darkBlue text-white shadow-md transform transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-crypto-lightBlue to-crypto-purple">
              320 Pay
            </h2>
            <p className="text-sm text-gray-400">{role === "merchant" ? "Merchant Panel" : "Admin Panel"}</p>
          </div>

          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-crypto-purple/20 rounded-full flex items-center justify-center mr-2">
                <Wallet size={16} className="text-crypto-purple" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Connected Wallet</p>
                <p className="text-sm font-mono">{shortenedAddress}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {links.map((link) => {
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-md transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-r from-crypto-blue to-crypto-purple text-white"
                      : "text-gray-300 hover:bg-gray-800",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className={cn("mr-3 h-5 w-5", isActive ? "text-white" : "text-gray-400")} />
                  <span>{link.name}</span>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-gray-800">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-red-900/20"
              onClick={() => {
                // In a real app, handle logout logic
                window.location.href = "/"
              }}
            >
              <LogOut className="mr-3 h-5 w-5 text-red-400" />
              Disconnect
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
