import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Bot,
  Instagram,
  Twitter,
  Camera,
  Settings,
  Play,
  Pause,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

const platforms = [
  { id: "instagram", name: "Instagram", icon: Instagram, color: "#E1306C", active: true },
  { id: "twitter", name: "Twitter", icon: Twitter, color: "#1DA1F2", active: true },
  { id: "snapchat", name: "Snapchat", icon: Camera, color: "#FFFC00", active: false },
];

const models = [
  { id: "emily", name: "Emily", status: "active", conversations: 1250, platform: "instagram" },
  { id: "mia", name: "Mia", status: "active", conversations: 980, platform: "twitter" },
  { id: "sofia", name: "Sofia", status: "paused", conversations: 720, platform: "snapchat" },
];

const adsAccounts = [
  { id: "acc1", name: "Profile_001", platform: "instagram", status: "connected" },
  { id: "acc2", name: "Profile_002", platform: "twitter", status: "connected" },
  { id: "acc3", name: "Profile_003", platform: "snapchat", status: "disconnected" },
];

export default function Chatbot() {
  const [selectedModel, setSelectedModel] = useState("emily");
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");

  const currentModel = models.find(m => m.id === selectedModel);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Chatbot Management</h1>
            <p className="text-muted-foreground">Configure and monitor your AI models across platforms</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add New Model
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Platform Selector */}
          <Card className="p-6 bg-gradient-card border-card-border shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Platform Selector</h3>
            <div className="space-y-3">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <div
                    key={platform.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedPlatform === platform.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-border/80"
                    }`}
                    onClick={() => setSelectedPlatform(platform.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" style={{ color: platform.color }} />
                      <span className="font-medium text-foreground">{platform.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={platform.active ? "default" : "secondary"}>
                        {platform.active ? "Active" : "Inactive"}
                      </Badge>
                      <Switch checked={platform.active} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Model Selector */}
          <Card className="p-6 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Model Selector</h3>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {models.map((model) => (
                <div
                  key={model.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedModel === model.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-border/80"
                  }`}
                  onClick={() => setSelectedModel(model.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{model.name}</div>
                      <div className="text-xs text-muted-foreground">{model.conversations} conversations</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={model.status === "active" ? "default" : "secondary"}>
                      {model.status}
                    </Badge>
                    {model.status === "active" ? (
                      <Button variant="outline" size="sm">
                        <Pause className="w-3 h-3" />
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        <Play className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* AdsPower Accounts */}
          <Card className="p-6 bg-gradient-card border-card-border shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">AdsPower Accounts</h3>
            <div className="space-y-3">
              {adsAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <Settings className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{account.name}</div>
                      <div className="text-xs text-muted-foreground capitalize">{account.platform}</div>
                    </div>
                  </div>
                  <Badge variant={account.status === "connected" ? "default" : "destructive"}>
                    {account.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Bot Settings */}
        {currentModel && (
          <Card className="p-6 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Bot Settings - {currentModel.name}</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Model
                </Button>
                <Button size="sm" className="bg-gradient-primary">
                  Save Changes
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="personality" className="text-sm font-medium text-foreground">Personality</Label>
                  <Select defaultValue="flirty">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flirty">Flirty & Playful</SelectItem>
                      <SelectItem value="friendly">Friendly & Casual</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="mysterious">Mysterious & Intriguing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tone" className="text-sm font-medium text-foreground">Tone</Label>
                  <Select defaultValue="casual">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="playful">Playful</SelectItem>
                      <SelectItem value="seductive">Seductive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="response-speed" className="text-sm font-medium text-foreground">Response Speed</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fast">Fast (1-2 min)</SelectItem>
                      <SelectItem value="medium">Medium (3-5 min)</SelectItem>
                      <SelectItem value="slow">Slow (5-10 min)</SelectItem>
                      <SelectItem value="human-like">Human-like (random)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="memory" className="text-sm font-medium text-foreground">Memory Settings</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="remember-names" className="text-sm text-muted-foreground">Remember Names</Label>
                      <Switch id="remember-names" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="remember-preferences" className="text-sm text-muted-foreground">Remember Preferences</Label>
                      <Switch id="remember-preferences" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="conversation-history" className="text-sm text-muted-foreground">Long Conversation History</Label>
                      <Switch id="conversation-history" />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="voice-notes" className="text-sm font-medium text-foreground">Voice Messages</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enable-voice" className="text-sm text-muted-foreground">Enable Voice Messages</Label>
                      <Switch id="enable-voice" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="voice-frequency" className="text-sm text-muted-foreground">High Voice Frequency</Label>
                      <Switch id="voice-frequency" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Label htmlFor="custom-prompt" className="text-sm font-medium text-foreground">Custom Instructions</Label>
              <Textarea
                id="custom-prompt"
                placeholder="Add custom instructions for this model's behavior..."
                className="mt-2 min-h-[100px]"
                defaultValue="You are Emily, a confident and flirty 22-year-old college student. You love adventures, photography, and meeting new people. Keep conversations engaging and playful while building genuine connections."
              />
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}