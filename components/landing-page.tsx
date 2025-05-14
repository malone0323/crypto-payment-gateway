"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ConnectWalletModal } from "@/components/wallet/connect-wallet-modal"
import { MasterKeyModal } from "@/components/admin/master-key-modal"
import { Wallet } from "lucide-react"

export function LandingPage() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [isAdminFlow, setIsAdminFlow] = useState(false)
  const [isMasterKeyModalOpen, setIsMasterKeyModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState("")
  const router = useRouter()

  const handleConnectWallet = (walletType: string) => {
    setIsLoading(true)

    // Simulate wallet connection
    setTimeout(() => {
      setIsLoading(false)

      // Mock wallet address
      const walletAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
      setConnectedWallet(walletAddress)

      // Close wallet modal
      setIsWalletModalOpen(false)

      if (isAdminFlow) {
        // For admin, show master key modal after wallet connection
        setIsMasterKeyModalOpen(true)
      } else {
        // For regular merchant, redirect to dashboard
        router.push("/merchant/dashboard")
      }
    }, 1500)
  }

  const handleAdminLogin = () => {
    setIsAdminFlow(true)
    setIsWalletModalOpen(true)
  }

  const handleMasterKeySubmit = (masterKey: string) => {
    // In a real app, verify the masterKey here
    if (masterKey === "admin123") {
      router.push("/admin/dashboard")
    } else {
      // Show error in the modal (handled in the modal component)
      // This would be handled by the modal in a real implementation
    }

    // Close master key modal
    setIsMasterKeyModalOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-crypto-darkBlue to-crypto-black text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-crypto-purple opacity-10 rounded-full filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-crypto-blue opacity-10 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-2/3 left-1/3 w-72 h-72 bg-crypto-green opacity-10 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <header className="relative z-10 w-full p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="320 Pay Logo"
              width={40}
              height={40}
              className="mr-3"
            />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-crypto-lightBlue to-crypto-purple">
              320 Pay
            </span>
          </div>

          <Button
            variant="outline"
            className="border-crypto-purple text-crypto-purple hover:bg-crypto-purple/10"
            onClick={handleAdminLogin}
          >
            Admin Login
          </Button>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-crypto-lightBlue to-crypto-purple">
              320 Pay
            </span>
            <br />
            <span>Secure Crypto Payments for Your Business</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Connect your wallet to access our powerful payment gateway and start accepting crypto payments today.
          </p>

          <Button
            onClick={() => {
              setIsAdminFlow(false)
              setIsWalletModalOpen(true)
            }}
            className="px-8 py-6 text-lg bg-gradient-to-r from-crypto-blue to-crypto-purple hover:from-crypto-purple hover:to-crypto-blue text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-pulse-glow"
            disabled={isLoading}
          >
            <Wallet className="mr-2 h-5 w-5" />
            {isLoading ? "Connecting..." : "Connect Wallet"}
          </Button>

          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-crypto-blue/20 rounded-full flex items-center justify-center mr-3">
                <Image src="/placeholder.svg?height=24&width=24" alt="Security" width={24} height={24} />
              </div>
              <div className="text-left">
                <h3 className="font-medium">Secure Transactions</h3>
                <p className="text-sm text-gray-400">End-to-end encryption</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-12 h-12 bg-crypto-purple/20 rounded-full flex items-center justify-center mr-3">
                <Image src="/placeholder.svg?height=24&width=24" alt="Fast" width={24} height={24} />
              </div>
              <div className="text-left">
                <h3 className="font-medium">Lightning Fast</h3>
                <p className="text-sm text-gray-400">Instant settlements</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-12 h-12 bg-crypto-green/20 rounded-full flex items-center justify-center mr-3">
                <Image src="/placeholder.svg?height=24&width=24" alt="Global" width={24} height={24} />
              </div>
              <div className="text-left">
                <h3 className="font-medium">Global Reach</h3>
                <p className="text-sm text-gray-400">Accept payments worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 w-full p-6 border-t border-gray-800">
        <div className="container mx-auto text-center text-sm text-gray-500">
          <p>© 2023 320 Pay. All rights reserved.</p>
        </div>
      </footer>

      {/* Modals */}
      <ConnectWalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleConnectWallet}
      />

      <MasterKeyModal
        isOpen={isMasterKeyModalOpen}
        onClose={() => setIsMasterKeyModalOpen(false)}
        onSubmit={handleMasterKeySubmit}
        walletAddress={connectedWallet}
      />

      {/* Blur overlay when master key modal is open */}
      {isMasterKeyModalOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />}
    </div>
  )
}
