import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Shield,
  Volume2,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Settings() {
  const [showAdsKey, setShowAdsKey] = useState(false);
  const [showElevenLabsKey, setShowElevenLabsKey] = useState(false);
  const [adsConnectionStatus, setAdsConnectionStatus] = useState("connected");
  const [elevenLabsConnectionStatus, setElevenLabsConnectionStatus] = useState("disconnected");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and integrations</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="adspower">AdsPower</TabsTrigger>
            <TabsTrigger value="elevenlabs">ElevenLabs</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Basic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      defaultValue="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      defaultValue="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      placeholder="Your company name"
                      defaultValue="Acme Corp"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input
                      id="timezone"
                      placeholder="UTC-5"
                      defaultValue="UTC-5"
                    />
                  </div>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="adspower" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>AdsPower API Connection</span>
                  </CardTitle>
                  <Badge variant={adsConnectionStatus === "connected" ? "default" : "destructive"}>
                    {adsConnectionStatus === "connected" ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <XCircle className="w-3 h-3 mr-1" />
                    )}
                    {adsConnectionStatus === "connected" ? "Connected" : "Not Connected"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="adspower-api-key">API Key</Label>
                  <div className="flex space-x-2 mt-2">
                    <div className="relative flex-1">
                      <Input
                        id="adspower-api-key"
                        type={showAdsKey ? "text" : "password"}
                        placeholder="Enter your AdsPower API key"
                        defaultValue="sk-adspower-1234567890abcdef"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowAdsKey(!showAdsKey)}
                      >
                        {showAdsKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <Button>Save</Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="adspower-endpoint">API Endpoint</Label>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="elevenlabs" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Volume2 className="w-5 h-5" />
                    <span>ElevenLabs API Connection</span>
                  </CardTitle>
                  <Badge variant={elevenLabsConnectionStatus === "connected" ? "default" : "destructive"}>
                    {elevenLabsConnectionStatus === "connected" ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <XCircle className="w-3 h-3 mr-1" />
                    )}
                    {elevenLabsConnectionStatus === "connected" ? "Connected" : "Not Connected"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="elevenlabs-key">API Key</Label>
                  <div className="flex space-x-2 mt-2">
                    <div className="relative flex-1">
                      <Input
                        id="elevenlabs-key"
                        type={showElevenLabsKey ? "text" : "password"}
                        placeholder="Enter your ElevenLabs API key"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowElevenLabsKey(!showElevenLabsKey)}
                      >
                        {showElevenLabsKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <Button>Save</Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="voice-id">Default Voice ID</Label>
                  <Input
                    id="voice-id"
                    placeholder="9BWtsMINqrJLrRacOk9x"
                    defaultValue="9BWtsMINqrJLrRacOk9x"
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Popular voices: Aria (9BWtsMINqrJLrRacOk9x), Sarah (EXAVITQu4vr4xnSDxMaL), Charlotte (XB0fDUnXU5powFXDhCwa)
                  </p>
                </div>

                <div>
                  <Label htmlFor="model-id">Model</Label>
                  <Input
                    id="model-id"
                    placeholder="eleven_multilingual_v2"
                    defaultValue="eleven_multilingual_v2"
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Recommended: eleven_multilingual_v2 for best quality, eleven_turbo_v2_5 for speed
                  </p>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline">Test Voice</Button>
                  <Button>Update Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}