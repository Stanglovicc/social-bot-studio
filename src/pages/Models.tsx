import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Users,
  Plus,
  DollarSign,
  MessageSquare,
  TrendingUp,
  Settings,
  Camera,
  Search,
  Star,
  Eye,
} from "lucide-react";

// Mock data for models
const modelsData = [
  {
    id: 1,
    name: "Emily Rose",
    username: "@emily_rose",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    tier: "Premium",
    subscribers: 15420,
    monthlyRevenue: 28500,
    status: "Active",
    chatPerformance: 89,
    lastActive: "2 hours ago",
    growth: "+12.5%",
    dailyRevenue: 1240,
    totalMessages: 342,
  },
  {
    id: 2,
    name: "Mia Santos",
    username: "@mia_santos",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    tier: "Basic",
    subscribers: 8750,
    monthlyRevenue: 12800,
    status: "Active",
    chatPerformance: 76,
    lastActive: "5 minutes ago",
    growth: "+8.3%",
    dailyRevenue: 580,
    totalMessages: 298,
  },
  {
    id: 3,
    name: "Sofia Kim",
    username: "@sofia_kim",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    tier: "Premium",
    subscribers: 22100,
    monthlyRevenue: 45200,
    status: "Active",
    chatPerformance: 94,
    lastActive: "1 hour ago",
    growth: "+18.7%",
    dailyRevenue: 1680,
    totalMessages: 567,
  },
  {
    id: 4,
    name: "Luna Martinez",
    username: "@luna_martinez",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    tier: "Basic",
    subscribers: 4320,
    monthlyRevenue: 7800,
    status: "Inactive",
    chatPerformance: 52,
    lastActive: "2 days ago",
    growth: "-2.1%",
    dailyRevenue: 290,
    totalMessages: 89,
  },
];

export default function Models() {
  const [selectedModel, setSelectedModel] = useState<number | null>(1);
  
  const selectedModelData = modelsData.find(m => m.id === selectedModel);

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Model List */}
      <div className="w-80 border-r border-border bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Models</h2>
          <Button size="sm" className="bg-gradient-primary">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search models..."
            className="pl-10 bg-background border-border"
          />
        </div>

        {/* Model List */}
        <div className="space-y-2">
          {modelsData.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${
                selectedModel === model.id 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'bg-background hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={model.avatar}
                  alt={model.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{model.name}</p>
                  <p className="text-sm opacity-75 truncate">{model.username}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${model.status === 'Active' ? 'bg-success' : 'bg-warning'}`}></div>
                    <span className="text-xs opacity-75">{model.tier}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Add Model Button */}
        <Button className="w-full bg-gradient-primary" size="lg">
          <Plus className="w-4 h-4 mr-2" />
          Add New Model
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        {selectedModelData ? (
          <div className="space-y-6">
            {/* Model Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <img
                  src={selectedModelData.avatar}
                  alt={selectedModelData.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{selectedModelData.name}</h1>
                  <p className="text-lg text-muted-foreground">{selectedModelData.username}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${selectedModelData.status === 'Active' ? 'bg-success' : 'bg-warning'}`}></div>
                      <span className="text-sm text-muted-foreground">{selectedModelData.status}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">• {selectedModelData.lastActive}</span>
                    <Badge className={selectedModelData.tier === 'Premium' ? 'bg-warning/10 text-warning border-warning/20' : 'bg-muted/10 text-muted-foreground border-muted/20'}>
                      {selectedModelData.tier}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
                <Button className="bg-gradient-primary">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 bg-gradient-card border-card-border shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Subscribers</p>
                    <p className="text-2xl font-bold text-foreground">{selectedModelData.subscribers.toLocaleString()}</p>
                    <p className="text-sm text-success">{selectedModelData.growth}</p>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-card border-card-border shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-success">${selectedModelData.monthlyRevenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Daily: ${selectedModelData.dailyRevenue}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-success" />
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-card border-card-border shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Chat Performance</p>
                    <p className="text-2xl font-bold text-foreground">{selectedModelData.chatPerformance}%</p>
                    <p className="text-sm text-muted-foreground">{selectedModelData.totalMessages} messages</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card border-card-border shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Performance</p>
                    <p className="text-2xl font-bold text-foreground">
                      {selectedModelData.chatPerformance > 80 ? 'Excellent' : 
                       selectedModelData.chatPerformance > 60 ? 'Good' : 'Needs Work'}
                    </p>
                    <p className="text-sm text-muted-foreground">Overall rating</p>
                  </div>
                  <Star className="w-8 h-8 text-warning" />
                </div>
              </Card>
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="p-6 bg-gradient-card border-card-border shadow-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-success/5 rounded-lg">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">New subscription received</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                    <span className="text-sm font-medium text-success">+$29.99</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">PPV message sent</p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                    <span className="text-sm font-medium text-primary">45 sent</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-warning/5 rounded-lg">
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Content uploaded</p>
                      <p className="text-xs text-muted-foreground">6 hours ago</p>
                    </div>
                    <span className="text-sm font-medium text-warning">3 photos</span>
                  </div>
                </div>
              </Card>

              {/* Assigned Team */}
              <Card className="p-6 bg-gradient-card border-card-border shadow-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Assigned Team</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-accent/5 rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">Sarah Johnson</p>
                      <p className="text-xs text-muted-foreground">Lead Chatter</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-success">89% conv rate</p>
                      <p className="text-xs text-muted-foreground">Online now</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-accent/5 rounded-lg">
                    <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Camera className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">Mike Rodriguez</p>
                      <p className="text-xs text-muted-foreground">Content Manager</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">12 uploads</p>
                      <p className="text-xs text-muted-foreground">This week</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-accent/5 rounded-lg">
                    <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-warning" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">Alex Chen</p>
                      <p className="text-xs text-muted-foreground">Analytics Manager</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">Weekly report</p>
                      <p className="text-xs text-muted-foreground">Due tomorrow</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Performance Chart Placeholder */}
            <Card className="p-6 bg-gradient-card border-card-border shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Performance Overview</h3>
              <div className="h-64 bg-accent/5 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Revenue and engagement charts will be displayed here</p>
              </div>
            </Card>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">Select a model to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}