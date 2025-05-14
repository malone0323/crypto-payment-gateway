"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Check, RefreshCw } from "lucide-react"

export function MerchantSettings() {
  const [activeTab, setActiveTab] = useState("profile")
  const [profile, setProfile] = useState({
    name: "John Merchant",
    email: "john@example.com",
    company: "Example Corp",
    phone: "+1 (555) 123-4567",
  })

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const [notifications, setNotifications] = useState({
    transactions: true,
    marketing: false,
    system: true,
    security: true,
  })

  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "Production Key", key: "pk_live_51HG8h4JHs7aJnPXXXXXXXXXX", created: "2023-01-01" },
    { id: 2, name: "Test Key", key: "pk_test_51HG8h4JHs7aJnPXXXXXXXXXX", created: "2023-01-01" },
  ])

  const [copiedKey, setCopiedKey] = useState<number | null>(null)

  const handleCopyKey = (id: number, key: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(id)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle profile update logic
    alert("Profile updated successfully!")
  }

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password update logic
    alert("Password updated successfully!")
    setPassword({ current: "", new: "", confirm: "" })
  }

  const handleNotificationsUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle notifications update logic
    alert("Notification preferences updated successfully!")
  }

  const generateNewApiKey = () => {
    // Handle API key generation logic
    const newKey = {
      id: apiKeys.length + 1,
      name: "New API Key",
      key: "pk_" + Math.random().toString(36).substring(2, 15),
      created: new Date().toISOString().split("T")[0],
    }
    setApiKeys([...apiKeys, newKey])
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-[#212529]">Settings</h1>
        <p className="text-[#6C757D]">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="animate-fadeIn">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="border-[#6C757D] focus:border-[#007BFF]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="border-[#6C757D] focus:border-[#007BFF]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                      className="border-[#6C757D] focus:border-[#007BFF]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="border-[#6C757D] focus:border-[#007BFF]"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="mt-4 bg-[#007BFF] hover:bg-[#0069d9] transition-transform duration-200 hover:scale-105"
                >
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password" className="animate-fadeIn">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={password.current}
                    onChange={(e) => setPassword({ ...password, current: e.target.value })}
                    className="border-[#6C757D] focus:border-[#007BFF]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={password.new}
                    onChange={(e) => setPassword({ ...password, new: e.target.value })}
                    className="border-[#6C757D] focus:border-[#007BFF]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={password.confirm}
                    onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                    className="border-[#6C757D] focus:border-[#007BFF]"
                  />
                </div>
                <Button
                  type="submit"
                  className="mt-4 bg-[#007BFF] hover:bg-[#0069d9] transition-transform duration-200 hover:scale-105"
                >
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="animate-fadeIn">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage your notification settings</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNotificationsUpdate} className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="transactions"
                      checked={notifications.transactions}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, transactions: checked as boolean })
                      }
                    />
                    <Label htmlFor="transactions" className="cursor-pointer">
                      Transaction Notifications
                      <p className="text-sm text-[#6C757D]">Receive notifications for new transactions</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={notifications.marketing}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, marketing: checked as boolean })
                      }
                    />
                    <Label htmlFor="marketing" className="cursor-pointer">
                      Marketing Emails
                      <p className="text-sm text-[#6C757D]">Receive marketing and promotional emails</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="system"
                      checked={notifications.system}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, system: checked as boolean })}
                    />
                    <Label htmlFor="system" className="cursor-pointer">
                      System Updates
                      <p className="text-sm text-[#6C757D]">
                        Receive notifications about system updates and maintenance
                      </p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="security"
                      checked={notifications.security}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, security: checked as boolean })
                      }
                    />
                    <Label htmlFor="security" className="cursor-pointer">
                      Security Alerts
                      <p className="text-sm text-[#6C757D]">
                        Receive notifications about security events and login attempts
                      </p>
                    </Label>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="mt-4 bg-[#28A745] hover:bg-[#218838] transition-transform duration-200 hover:scale-105"
                >
                  Save Preferences
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-keys" className="animate-fadeIn">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for integration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  className="bg-[#007BFF] hover:bg-[#0069d9] transition-transform duration-200 hover:scale-105"
                  onClick={generateNewApiKey}
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> Generate New API Key
                </Button>

                <div className="space-y-4 mt-6">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="p-4 border rounded-md">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{apiKey.name}</h3>
                          <p className="text-sm text-[#6C757D]">Created: {apiKey.created}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopyKey(apiKey.id, apiKey.key)}
                          className="text-[#6C757D]"
                        >
                          {copiedKey === apiKey.id ? (
                            <>
                              <Check className="mr-2 h-4 w-4 text-[#28A745]" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="mr-2 h-4 w-4" /> Copy
                            </>
                          )}
                        </Button>
                      </div>
                      <div className="mt-2 p-2 bg-gray-100 rounded font-mono text-sm overflow-x-auto">{apiKey.key}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
