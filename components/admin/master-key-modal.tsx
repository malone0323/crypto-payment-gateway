"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Key } from "lucide-react"

interface MasterKeyModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (masterKey: string) => void
  walletAddress: string
}

export function MasterKeyModal({ isOpen, onClose, onSubmit, walletAddress }: MasterKeyModalProps) {
  const [masterKey, setMasterKey] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = () => {
    if (!masterKey.trim()) {
      setError("Master key is required")
      return
    }

    setIsLoading(true)
    setError("")

    // In a real app, you would validate the master key here
    setTimeout(() => {
      onSubmit(masterKey)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-crypto-darkBlue border-0 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-crypto-black dark:text-white flex items-center justify-center gap-2">
            <Key className="h-5 w-5 text-crypto-purple" />
            Admin Authentication
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 dark:text-gray-300">
            Enter your master key to access the 320 Pay admin panel
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md">
              <AlertCircle size={18} />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
              <p className="text-sm text-gray-500 dark:text-gray-400">Connected Wallet</p>
              <p className="text-sm font-mono text-gray-900 dark:text-gray-200">{walletAddress}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="masterKey">Master Key</Label>
            <Input
              id="masterKey"
              type="password"
              placeholder="Enter master key"
              value={masterKey}
              onChange={(e) => setMasterKey(e.target.value)}
              className="border-gray-300 dark:border-gray-700 focus:border-crypto-purple dark:focus:border-crypto-purple"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit()
                }
              }}
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-crypto-blue to-crypto-purple hover:from-crypto-purple hover:to-crypto-blue text-white"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Access Admin Panel"}
          </Button>
        </div>

        <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
          This area is restricted to authorized administrators only
        </div>
      </DialogContent>
    </Dialog>
  )
}
