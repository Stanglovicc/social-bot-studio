import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Key,
  Database,
  Palette,
  Link,
  Shield,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Settings() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [adsConnectionStatus, setAdsConnectionStatus] = useState("connected");
  const [openaiConnectionStatus, setOpenaiConnectionStatus] = useState("connected");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your dashboard configuration and integrations</p>
        </div>

        <Tabs defaultValue="api-keys" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="token-usage">Token Usage</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="api-keys" className="space-y-6">
            {/* AdsPower API Connection */}
            <Card className="p-6 bg-gradient-card border-card-border shadow-card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">AdsPower API Connection</h3>
                    <p className="text-sm text-muted-foreground">Connect your AdsPower account to manage profiles</p>
                  </div>
                </div>
                <Badge variant={adsConnectionStatus === "connected" ? "default" : "destructive"} className="flex items-center space-x-1">
                  {adsConnectionStatus === "connected" ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <XCircle className="w-3 h-3" />
                  )}
                  <span>{adsConnectionStatus === "connected" ? "Connected" : "Not Connected"}</span>
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="adspower-api-key" className="text-sm font-medium text-foreground">API Key</Label>
                  <div className="flex space-x-2 mt-2">
                    <div className="relative flex-1">
                      <Input
                        id="adspower-api-key"
                        type={showApiKey ? "text" : "password"}
                        placeholder="Enter your AdsPower API key"
                        defaultValue="sk-adspower-1234567890abcdef"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <Button>Save Key</Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="adspower-endpoint" className="text-sm font-medium text-foreground">API Endpoint</Label>
                  <Input
                    id="adspower-endpoint"
                    placeholder="https://local.adspower.net:50325"
                    defaultValue="https://local.adspower.net:50325"
                    className="mt-2"
                  />
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline">Test Connection</Button>
                  <Button>Update Settings</Button>
                </div>
              </div>
            </Card>

            {/* OpenAI API Connection */}
            <Card className="p-6 bg-gradient-card border-card-border shadow-card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Key className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">OpenAI API Connection</h3>
                    <p className="text-sm text-muted-foreground">Configure your OpenAI API for AI model responses</p>
                  </div>
                </div>
                <Badge variant={openaiConnectionStatus === "connected" ? "default" : "destructive"} className="flex items-center space-x-1">
                  {openaiConnectionStatus === "connected" ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <XCircle className="w-3 h-3" />
                  )}
                  <span>{openaiConnectionStatus === "connected" ? "Active" : "Inactive"}</span>
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="openai-api-key" className="text-sm font-medium text-foreground">API Key</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      id="openai-api-key"
                      type="password"
                      placeholder="sk-..."
                      defaultValue="sk-1234567890abcdef1234567890abcdef"
                    />
                    <Button>Save Key</Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="organization-id" className="text-sm font-medium text-foreground">Organization ID (Optional)</Label>
                  <Input
                    id="organization-id"
                    placeholder="org-..."
                    className="mt-2"
                  />
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline">Test Connection</Button>
                  <Button>Update Settings</Button>
                </div>
              </div>
            </Card>

            {/* Other API Keys */}
            <Card className="p-6 bg-gradient-card border-card-border shadow-card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Link className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Other API Keys</h3>
                    <p className="text-sm text-muted-foreground">Additional service integrations</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="anthropic-key" className="text-sm font-medium text-foreground">Anthropic API Key</Label>
                  <Input
                    id="anthropic-key"
                    type="password"
                    placeholder="sk-ant-..."
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="elevenlabs-key" className="text-sm font-medium text-foreground">ElevenLabs API Key</Label>
                  <Input
                    id="elevenlabs-key"
                    type="password"
                    placeholder="Voice generation API key"
                    className="mt-2"
                  />
                </div>

                <Button>Save API Keys</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="token-usage" className="space-y-6">
            <Card className="p-6 bg-gradient-card border-card-border shadow-card">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Token Usage Controls</h3>
                  <p className="text-sm text-muted-foreground">Optimize AI model usage and costs</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-foreground">Default Model Selection</Label>
                  <Select defaultValue="gpt-4o-mini">
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o">GPT-4o (Higher Quality)</SelectItem>
                      <SelectItem value="gpt-4o-mini">GPT-4o Mini (Cost Effective)</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Fastest)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-foreground">Smart Model Switching</Label>
                      <p className="text-xs text-muted-foreground">Automatically use GPT-4o for complex conversations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-foreground">Token Usage Alerts</Label>
                      <p className="text-xs text-muted-foreground">Get notified when approaching limits</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-foreground">Auto-optimize Responses</Label>
                      <p className="text-xs text-muted-foreground">Compress prompts to reduce token usage</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div>
                  <Label htmlFor="monthly-budget" className="text-sm font-medium text-foreground">Monthly Budget Limit ($)</Label>
                  <Input
                    id="monthly-budget"
                    type="number"
                    placeholder="500"
                    defaultValue="500"
                    className="mt-2"
                  />
                </div>

                <Button>Save Token Settings</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="theme" className="space-y-6">
            <Card className="p-6 bg-gradient-card border-card-border shadow-card">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Palette className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Theme & Layout Settings</h3>
                  <p className="text-sm text-muted-foreground">Customize your dashboard appearance</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-foreground">Color Scheme</Label>
                  <Select defaultValue="dark">
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">Dark Theme</SelectItem>
                      <SelectItem value="light">Light Theme</SelectItem>
                      <SelectItem value="auto">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-foreground">Accent Color</Label>
                  <div className="flex space-x-3 mt-2">
                    <div className="w-8 h-8 bg-primary rounded-full border-2 border-primary cursor-pointer"></div>
                    <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-transparent hover:border-green-500 cursor-pointer"></div>
                    <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-transparent hover:border-purple-500 cursor-pointer"></div>
                    <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-transparent hover:border-orange-500 cursor-pointer"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-foreground">Compact Sidebar</Label>
                      <p className="text-xs text-muted-foreground">Reduce sidebar width for more space</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-foreground">Animations</Label>
                      <p className="text-xs text-muted-foreground">Enable smooth transitions and animations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Button>Save Theme Settings</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="p-6 bg-gradient-card border-card-border shadow-card">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
                  <p className="text-sm text-muted-foreground">Manage account security and access controls</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-foreground">Two-Factor Authentication</Label>
                      <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-foreground">Login Notifications</Label>
                      <p className="text-xs text-muted-foreground">Get notified of new login attempts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-foreground">API Rate Limiting</Label>
                      <p className="text-xs text-muted-foreground">Protect against API abuse</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div>
                  <Label htmlFor="session-timeout" className="text-sm font-medium text-foreground">Session Timeout (hours)</Label>
                  <Select defaultValue="24">
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                      <SelectItem value="168">1 week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-3">
                  <Button variant="destructive">Reset All Sessions</Button>
                  <Button>Save Security Settings</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
