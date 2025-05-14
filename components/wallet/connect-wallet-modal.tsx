"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Wallet, AlertCircle } from "lucide-react"

interface ConnectWalletModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (walletType: string) => void
}

export function ConnectWalletModal({ isOpen, onClose, onConnect }: ConnectWalletModalProps) {
  const [error, setError] = useState("")

  const handleConnect = (walletType: string) => {
    setError("")
    onConnect(walletType)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-crypto-darkBlue border-0 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-crypto-black dark:text-white">
            Connect Your Wallet to 320 Pay
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 dark:text-gray-300">
            Connect your wallet to access the 320 Pay platform
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md">
              <AlertCircle size={18} />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <Button
              onClick={() => handleConnect("metamask")}
              className="w-full flex items-center justify-between p-4 h-auto bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg text-left text-crypto-black dark:text-white hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 mr-3 flex-shrink-0">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="MetaMask"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </div>
                <div>
                  <p className="font-medium">MetaMask</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Connect to your MetaMask wallet</p>
                </div>
              </div>
              <div className="text-crypto-purple">
                <Wallet size={20} />
              </div>
            </Button>

            <Button
              onClick={() => handleConnect("walletconnect")}
              className="w-full flex items-center justify-between p-4 h-auto bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg text-left text-crypto-black dark:text-white hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 mr-3 flex-shrink-0">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="WalletConnect"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </div>
                <div>
                  <p className="font-medium">WalletConnect</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Connect using WalletConnect</p>
                </div>
              </div>
              <div className="text-crypto-purple">
                <Wallet size={20} />
              </div>
            </Button>

            <Button
              onClick={() => handleConnect("coinbase")}
              className="w-full flex items-center justify-between p-4 h-auto bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg text-left text-crypto-black dark:text-white hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 mr-3 flex-shrink-0">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Coinbase Wallet"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </div>
                <div>
                  <p className="font-medium">Coinbase Wallet</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Connect to your Coinbase wallet</p>
                </div>
              </div>
              <div className="text-crypto-purple">
                <Wallet size={20} />
              </div>
            </Button>
          </div>
        </div>

        <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
          By connecting your wallet, you agree to 320 Pay's Terms of Service and Privacy Policy
        </div>
      </DialogContent>
    </Dialog>
  )
}
