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
  Plus,
  Trash2,
} from "lucide-react";

// Mock models data
const modelsData = [
  { id: 1, name: "Emily Rose", username: "@emily_rose" },
  { id: 2, name: "Mia Santos", username: "@mia_santos" },
  { id: 3, name: "Sofia Kim", username: "@sofia_kim" },
  { id: 4, name: "Luna Martinez", username: "@luna_martinez" },
];

export default function Settings() {
  const [showAdsKey, setShowAdsKey] = useState(false);
  const [showElevenLabsKeys, setShowElevenLabsKeys] = useState<{[key: number]: boolean}>({});
  const [adsConnectionStatus, setAdsConnectionStatus] = useState("connected");
  const [elevenLabsConnections, setElevenLabsConnections] = useState<{[key: number]: {apiKey: string, voiceId: string, model: string, status: string}}>({
    1: { apiKey: "sk-11labs-emily-1234567890", voiceId: "9BWtsMINqrJLrRacOk9x", model: "eleven_multilingual_v2", status: "connected" },
    2: { apiKey: "", voiceId: "EXAVITQu4vr4xnSDxMaL", model: "eleven_turbo_v2_5", status: "disconnected" },
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and integrations</p>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Account Info</TabsTrigger>
            <TabsTrigger value="adspower">AdsPower</TabsTrigger>
            <TabsTrigger value="elevenlabs">ElevenLabs</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Account Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="Enter your username"
                      defaultValue="admin_user"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@example.com"
                      defaultValue="admin@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showAdsKey ? "text" : "password"}
                        placeholder="Enter current password"
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
                  </div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Enter new password (optional)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button>Update Account</Button>
                  <Button variant="outline">Change Password</Button>
                </div>
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
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">ElevenLabs API Connections</h3>
                <p className="text-sm text-muted-foreground">Configure ElevenLabs API for each model</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const availableModel = modelsData.find(model => !elevenLabsConnections[model.id]);
                  if (availableModel) {
                    setElevenLabsConnections(prev => ({
                      ...prev,
                      [availableModel.id]: { apiKey: "", voiceId: "9BWtsMINqrJLrRacOk9x", model: "eleven_multilingual_v2", status: "disconnected" }
                    }));
                  }
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Connection
              </Button>
            </div>

            <div className="space-y-4">
              {Object.entries(elevenLabsConnections).map(([modelIdStr, connection]) => {
                const modelId = parseInt(modelIdStr);
                const modelData = modelsData.find(m => m.id === modelId);
                if (!modelData) return null;

                return (
                  <Card key={modelId}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                          <Volume2 className="w-5 h-5" />
                          <span>{modelData.name} - ElevenLabs API</span>
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge variant={connection.status === "connected" ? "default" : "destructive"}>
                            {connection.status === "connected" ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <XCircle className="w-3 h-3 mr-1" />
                            )}
                            {connection.status === "connected" ? "Connected" : "Not Connected"}
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setElevenLabsConnections(prev => {
                                const updated = { ...prev };
                                delete updated[modelId];
                                return updated;
                              });
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor={`elevenlabs-key-${modelId}`}>API Key</Label>
                        <div className="flex space-x-2 mt-2">
                          <div className="relative flex-1">
                            <Input
                              id={`elevenlabs-key-${modelId}`}
                              type={showElevenLabsKeys[modelId] ? "text" : "password"}
                              placeholder="Enter ElevenLabs API key for this model"
                              value={connection.apiKey}
                              onChange={(e) => {
                                setElevenLabsConnections(prev => ({
                                  ...prev,
                                  [modelId]: { ...prev[modelId], apiKey: e.target.value }
                                }));
                              }}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-1/2 transform -translate-y-1/2"
                              onClick={() => setShowElevenLabsKeys(prev => ({ ...prev, [modelId]: !prev[modelId] }))}
                            >
                              {showElevenLabsKeys[modelId] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </div>
                          <Button
                            onClick={() => {
                              setElevenLabsConnections(prev => ({
                                ...prev,
                                [modelId]: { ...prev[modelId], status: "connected" }
                              }));
                            }}
                          >
                            Save
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`voice-id-${modelId}`}>Voice ID</Label>
                          <Input
                            id={`voice-id-${modelId}`}
                            placeholder="9BWtsMINqrJLrRacOk9x"
                            value={connection.voiceId}
                            onChange={(e) => {
                              setElevenLabsConnections(prev => ({
                                ...prev,
                                [modelId]: { ...prev[modelId], voiceId: e.target.value }
                              }));
                            }}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`model-${modelId}`}>ElevenLabs Model</Label>
                          <Input
                            id={`model-${modelId}`}
                            placeholder="eleven_multilingual_v2"
                            value={connection.model}
                            onChange={(e) => {
                              setElevenLabsConnections(prev => ({
                                ...prev,
                                [modelId]: { ...prev[modelId], model: e.target.value }
                              }));
                            }}
                            className="mt-2"
                          />
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>Popular voices: Aria (9BWtsMINqrJLrRacOk9x), Sarah (EXAVITQu4vr4xnSDxMaL), Charlotte (XB0fDUnXU5powFXDhCwa)</p>
                        <p>Models: eleven_multilingual_v2 (best quality), eleven_turbo_v2_5 (fast), eleven_turbo_v2 (English only)</p>
                      </div>

                      <div className="flex space-x-3">
                        <Button variant="outline" size="sm">Test Voice</Button>
                        <Button size="sm">Update Settings</Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {Object.keys(elevenLabsConnections).length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <Volume2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No ElevenLabs connections configured</p>
                    <p className="text-sm text-muted-foreground">Click "Add Connection" to configure ElevenLabs for your models</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}