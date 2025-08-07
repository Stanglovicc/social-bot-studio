import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Bot,
  Instagram,
  Twitter,
  Camera,
  Play,
  CheckCircle,
  Circle,
} from "lucide-react";

// Mock data for models from the Models page
const availableModels = [
  {
    id: 1,
    name: "Emily Rose",
    username: "@emily_rose",
    tier: "Premium",
    status: "Active",
  },
  {
    id: 2,
    name: "Mia Santos",
    username: "@mia_santos",
    tier: "Basic",
    status: "Active",
  },
  {
    id: 3,
    name: "Sofia Kim",
    username: "@sofia_kim",
    tier: "Premium",
    status: "Active",
  },
];

const platforms = [
  { id: "instagram", name: "Instagram", icon: Instagram, color: "#E1306C" },
  { id: "snapchat", name: "Snapchat", icon: Camera, color: "#FFFC00" },
  { id: "twitter", name: "Twitter", icon: Twitter, color: "#1DA1F2" },
];

// Mock AdsPower profiles
const adsPowerProfiles = [
  { id: "profile_001", name: "Profile_001" },
  { id: "profile_002", name: "Profile_002" },
  { id: "profile_003", name: "Profile_003" },
  { id: "profile_004", name: "Profile_004" },
  { id: "profile_005", name: "Profile_005" },
];

export default function Chatbot() {
  const [selectedModel, setSelectedModel] = useState<number | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [adsPowerAssignments, setAdsPowerAssignments] = useState<Record<string, string>>({});
  const [isRunning, setIsRunning] = useState(false);

  const selectedModelData = availableModels.find(m => m.id === selectedModel);

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => {
      const newPlatforms = prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId];
      
      // Clear assignments for removed platforms
      if (!newPlatforms.includes(platformId)) {
        setAdsPowerAssignments(prev => {
          const newAssignments = { ...prev };
          delete newAssignments[platformId];
          return newAssignments;
        });
      }
      
      return newPlatforms;
    });
  };

  const handleAdsPowerAssignment = (platform: string, profileId: string) => {
    setAdsPowerAssignments(prev => ({
      ...prev,
      [platform]: profileId
    }));
  };

  const isConfigurationComplete = () => {
    return selectedModel && 
           selectedPlatforms.length > 0 && 
           selectedPlatforms.every(platform => adsPowerAssignments[platform]);
  };

  const handleRunBot = () => {
    if (isConfigurationComplete()) {
      setIsRunning(true);
      console.log("Starting bot with configuration:", {
        model: selectedModelData,
        platforms: selectedPlatforms,
        assignments: adsPowerAssignments
      });
      // Here you would implement the actual bot starting logic
    }
  };

  const handleStopBot = () => {
    setIsRunning(false);
    console.log("Stopping bot");
    // Here you would implement the actual bot stopping logic
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">ChatBot Configuration</h1>
            <p className="text-muted-foreground">Configure your AI model to run across social platforms</p>
          </div>
          {isRunning && (
            <Button 
              onClick={handleStopBot}
              variant="destructive"
              size="lg"
            >
              <Circle className="w-4 h-4 mr-2" />
              Stop Bot
            </Button>
          )}
        </div>

        {/* Step 1: Choose Model */}
        <Card className="p-6 bg-gradient-card border-card-border shadow-card">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">1</div>
            <h3 className="text-xl font-semibold text-foreground">Choose Model</h3>
          </div>
          
          <div className="space-y-4">
            <Label htmlFor="model-select" className="text-sm font-medium text-foreground">Select a Model</Label>
            <Select value={selectedModel?.toString() || ""} onValueChange={(value) => setSelectedModel(parseInt(value))}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Choose a model..." />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map((model) => (
                  <SelectItem key={model.id} value={model.id.toString()}>
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4" />
                      <span>{model.name}</span>
                      <span className="text-muted-foreground">({model.tier})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedModelData && (
              <div className="mt-4 p-4 bg-accent/5 rounded-lg border border-accent/20">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <div>
                    <p className="font-medium text-foreground">Selected: {selectedModelData.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedModelData.username} • {selectedModelData.tier} Tier</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Step 2: Choose Platforms */}
        <Card className="p-6 bg-gradient-card border-card-border shadow-card">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">2</div>
            <h3 className="text-xl font-semibold text-foreground">Choose Platform(s)</h3>
          </div>
          
          <div className="space-y-4">
            <Label className="text-sm font-medium text-foreground">Select platforms to run the bot on:</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                const isSelected = selectedPlatforms.includes(platform.id);
                
                return (
                  <div
                    key={platform.id}
                    className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all ${
                      isSelected 
                        ? "border-primary bg-primary/10 shadow-md" 
                        : "border-border hover:border-border/80 hover:bg-accent/5"
                    }`}
                    onClick={() => handlePlatformToggle(platform.id)}
                  >
                    <Checkbox 
                      checked={isSelected}
                      onChange={() => handlePlatformToggle(platform.id)}
                      className="pointer-events-none"
                    />
                    <Icon className="w-6 h-6" style={{ color: platform.color }} />
                    <span className="font-medium text-foreground">{platform.name}</span>
                  </div>
                );
              })}
            </div>
            
            {selectedPlatforms.length > 0 && (
              <div className="mt-4 p-4 bg-accent/5 rounded-lg border border-accent/20">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <div>
                    <p className="font-medium text-foreground">Selected Platforms: {selectedPlatforms.length}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedPlatforms.map(p => platforms.find(platform => platform.id === p)?.name).join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Step 3: Assign AdsPower Profiles */}
        {selectedPlatforms.length > 0 && (
          <Card className="p-6 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">3</div>
              <h3 className="text-xl font-semibold text-foreground">Assign AdsPower Profiles Per Platform</h3>
            </div>
            
            <div className="space-y-6">
              {selectedPlatforms.map((platformId) => {
                const platform = platforms.find(p => p.id === platformId);
                if (!platform) return null;
                
                const Icon = platform.icon;
                
                return (
                  <div key={platformId} className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" style={{ color: platform.color }} />
                      <Label className="text-base font-medium text-foreground">{platform.name}:</Label>
                    </div>
                    
                    <Select 
                      value={adsPowerAssignments[platformId] || ""} 
                      onValueChange={(value) => handleAdsPowerAssignment(platformId, value)}
                    >
                      <SelectTrigger className="w-full max-w-md ml-8">
                        <SelectValue placeholder={`Select AdsPower profile for ${platform.name}...`} />
                      </SelectTrigger>
                      <SelectContent>
                        {adsPowerProfiles.map((profile) => (
                          <SelectItem key={profile.id} value={profile.id}>
                            {profile.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                );
              })}
              
              {selectedPlatforms.every(platform => adsPowerAssignments[platform]) && (
                <div className="mt-4 p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <div>
                      <p className="font-medium text-foreground">All platforms configured</p>
                      <p className="text-sm text-muted-foreground">AdsPower profiles assigned to all selected platforms</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Step 4: Run Button */}
        <Card className="p-6 bg-gradient-card border-card-border shadow-card">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">4</div>
            <h3 className="text-xl font-semibold text-foreground">Launch Bot</h3>
          </div>
          
          <div className="space-y-4">
            {isConfigurationComplete() ? (
              <div className="space-y-4">
                <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <div>
                      <p className="font-medium text-success">Configuration Complete</p>
                      <p className="text-sm text-muted-foreground">All settings configured. Ready to launch bot.</p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleRunBot}
                  disabled={isRunning}
                  size="lg"
                  className="bg-gradient-primary text-lg px-8 py-3"
                >
                  <Play className="w-5 h-5 mr-2" />
                  {isRunning ? "Bot Running..." : "RUN BOT"}
                </Button>
                
                {isRunning && (
                  <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                      <div>
                        <p className="font-medium text-foreground">Bot is running</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedModelData?.name} is active on {selectedPlatforms.length} platform(s)
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                <div className="flex items-center space-x-3">
                  <Circle className="w-5 h-5 text-warning" />
                  <div>
                    <p className="font-medium text-warning">Configuration Incomplete</p>
                    <p className="text-sm text-muted-foreground">
                      Please complete all steps above before running the bot.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}