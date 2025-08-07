import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Users,
  Plus,
  Settings,
  Search,
  Save,
  User,
  MessageCircle,
  Heart,
  Sparkles,
} from "lucide-react";

// Mock data for models
const modelsData = [
  {
    id: 1,
    name: "Emily Rose",
    username: "@emily_rose",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    tier: "Premium",
    status: "Active",
    lastActive: "2 hours ago",
    personality: {
      name: "Emily Rose",
      age: "23",
      location: "Miami, FL",
      occupation: "Content Creator & Model",
      interests: ["Fashion", "Fitness", "Travel", "Photography"],
      personality: "Flirty, confident, and adventurous. I love connecting with people and sharing my lifestyle.",
      communicationStyle: "Playful and engaging, uses emojis frequently, responds with enthusiasm",
      background: "Originally from California, moved to Miami for modeling. Loves beach life and sunset photography.",
      specialties: ["Custom content", "Role-play scenarios", "GFE (Girlfriend Experience)"],
    },
  },
  {
    id: 2,
    name: "Mia Santos",
    username: "@mia_santos",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    tier: "Basic",
    status: "Active",
    lastActive: "5 minutes ago",
    personality: {
      name: "Mia Santos",
      age: "25",
      location: "Los Angeles, CA",
      occupation: "Yoga Instructor & Content Creator",
      interests: ["Yoga", "Wellness", "Cooking", "Nature"],
      personality: "Sweet, caring, and health-conscious. Always positive and loves helping others feel good.",
      communicationStyle: "Warm and nurturing, uses heart emojis, focuses on wellness and positivity",
      background: "Certified yoga instructor who started content creation to share wellness tips and connect with like-minded people.",
      specialties: ["Yoga sessions", "Wellness advice", "Meditation content"],
    },
  },
  {
    id: 3,
    name: "Sofia Kim",
    username: "@sofia_kim",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    tier: "Premium",
    status: "Active",
    lastActive: "1 hour ago",
    personality: {
      name: "Sofia Kim",
      age: "22",
      location: "New York, NY",
      occupation: "Art Student & Model",
      interests: ["Art", "Music", "Fashion", "Coffee"],
      personality: "Creative, intellectual, and mysterious. Loves deep conversations and artistic expression.",
      communicationStyle: "Thoughtful and artistic, shares creative insights, uses aesthetic emojis",
      background: "Fine arts student in NYC, creates content to fund her education and share her artistic journey.",
      specialties: ["Artistic content", "Behind-the-scenes", "Creative collaborations"],
    },
  },
  {
    id: 4,
    name: "Luna Martinez",
    username: "@luna_martinez",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    tier: "Basic",
    status: "Inactive",
    lastActive: "2 days ago",
    personality: {
      name: "Luna Martinez",
      age: "24",
      location: "Austin, TX",
      occupation: "Musician & Content Creator",
      interests: ["Music", "Gaming", "Movies", "Food"],
      personality: "Fun-loving, quirky, and down-to-earth. Loves to laugh and make others smile.",
      communicationStyle: "Casual and fun, uses gaming references, very relatable and approachable",
      background: "Part-time musician who creates content for fun and to connect with fans of her music.",
      specialties: ["Music content", "Gaming streams", "Casual conversations"],
    },
  },
];

export default function Models() {
  const [selectedModel, setSelectedModel] = useState<number | null>(1);
  const [editedPersonality, setEditedPersonality] = useState<any>(null);
  
  const selectedModelData = modelsData.find(m => m.id === selectedModel);

  // Initialize edited personality when model changes
  useEffect(() => {
    if (selectedModelData) {
      setEditedPersonality(selectedModelData.personality);
    }
  }, [selectedModel, selectedModelData]);

  const handleSavePersonality = () => {
    // Here you would save the personality data
    console.log("Saving personality for model:", selectedModel, editedPersonality);
    // You can add your save logic here
  };

  return (
    <DashboardLayout>
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
            {/* Save Button */}
            <div className="flex justify-end mb-6">
              <Button onClick={handleSavePersonality} className="bg-gradient-primary">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>

            {/* Personality Settings */}
            {editedPersonality && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <Card className="p-6 bg-gradient-card border-card-border shadow-card">
                  <div className="flex items-center space-x-2 mb-4">
                    <User className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</Label>
                      <Input
                        id="name"
                        value={editedPersonality.name}
                        onChange={(e) => setEditedPersonality({...editedPersonality, name: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="age" className="text-sm font-medium text-foreground">Age</Label>
                        <Input
                          id="age"
                          value={editedPersonality.age}
                          onChange={(e) => setEditedPersonality({...editedPersonality, age: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location" className="text-sm font-medium text-foreground">Location</Label>
                        <Input
                          id="location"
                          value={editedPersonality.location}
                          onChange={(e) => setEditedPersonality({...editedPersonality, location: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="occupation" className="text-sm font-medium text-foreground">Occupation</Label>
                      <Input
                        id="occupation"
                        value={editedPersonality.occupation}
                        onChange={(e) => setEditedPersonality({...editedPersonality, occupation: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="interests" className="text-sm font-medium text-foreground">Interests (comma separated)</Label>
                      <Input
                        id="interests"
                        value={editedPersonality.interests.join(', ')}
                        onChange={(e) => setEditedPersonality({...editedPersonality, interests: e.target.value.split(', ')})}
                        className="mt-1"
                        placeholder="Fashion, Fitness, Travel..."
                      />
                    </div>
                  </div>
                </Card>

                {/* Personality & Communication */}
                <Card className="p-6 bg-gradient-card border-card-border shadow-card">
                  <div className="flex items-center space-x-2 mb-4">
                    <Heart className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Personality & Style</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="personality" className="text-sm font-medium text-foreground">Personality Description</Label>
                      <Textarea
                        id="personality"
                        value={editedPersonality.personality}
                        onChange={(e) => setEditedPersonality({...editedPersonality, personality: e.target.value})}
                        className="mt-1 min-h-[100px]"
                        placeholder="Describe the personality traits, characteristics, and vibe..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="communication" className="text-sm font-medium text-foreground">Communication Style</Label>
                      <Textarea
                        id="communication"
                        value={editedPersonality.communicationStyle}
                        onChange={(e) => setEditedPersonality({...editedPersonality, communicationStyle: e.target.value})}
                        className="mt-1 min-h-[80px]"
                        placeholder="How does this model communicate? Tone, emoji usage, response style..."
                      />
                    </div>
                  </div>
                </Card>

                {/* Background & Story */}
                <Card className="p-6 bg-gradient-card border-card-border shadow-card">
                  <div className="flex items-center space-x-2 mb-4">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Background & Story</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="background" className="text-sm font-medium text-foreground">Background Story</Label>
                      <Textarea
                        id="background"
                        value={editedPersonality.background}
                        onChange={(e) => setEditedPersonality({...editedPersonality, background: e.target.value})}
                        className="mt-1 min-h-[120px]"
                        placeholder="Tell the model's backstory, how they got started, life experiences..."
                      />
                    </div>
                  </div>
                </Card>

                {/* Specialties & Services */}
                <Card className="p-6 bg-gradient-card border-card-border shadow-card">
                  <div className="flex items-center space-x-2 mb-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Specialties & Services</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="specialties" className="text-sm font-medium text-foreground">Specialties (comma separated)</Label>
                      <Input
                        id="specialties"
                        value={editedPersonality.specialties.join(', ')}
                        onChange={(e) => setEditedPersonality({...editedPersonality, specialties: e.target.value.split(', ')})}
                        className="mt-1"
                        placeholder="Custom content, Role-play, GFE..."
                      />
                    </div>
                    <div className="bg-accent/5 p-4 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Current Specialties:</h4>
                      <div className="flex flex-wrap gap-2">
                        {editedPersonality.specialties.map((specialty: string, index: number) => (
                          <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
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
    </DashboardLayout>
  );
}