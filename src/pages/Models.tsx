import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Plus,
  Search,
  Save,
  User,
  MessageCircle,
  Heart,
  Sparkles,
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
  const [searchTerm, setSearchTerm] = useState("");
  
  const selectedModelData = modelsData.find(m => m.id === selectedModel);
  const filteredModels = modelsData.filter(model => 
    model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSavePersonality = () => {
    console.log("Saving personality for model:", selectedModel);
  };

  return (
    <DashboardLayout>
      <div className="flex h-full gap-6">
        {/* Left Sidebar - Model List */}
        <div className="w-80 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Models
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search models..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Model List */}
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {filteredModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedModel === model.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-accent'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={model.avatar}
                        alt={model.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{model.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className={`w-2 h-2 rounded-full ${model.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                          <Badge variant="secondary" className="text-xs">{model.tier}</Badge>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <Button className="w-full" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add New Model
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {selectedModelData ? (
            <div className="space-y-6">
              {/* Model Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={selectedModelData.avatar}
                        alt={selectedModelData.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <CardTitle className="text-xl">{selectedModelData.name}</CardTitle>
                        <p className="text-muted-foreground">{selectedModelData.username}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant={selectedModelData.status === 'Active' ? 'default' : 'secondary'}>
                            {selectedModelData.status}
                          </Badge>
                          <Badge variant="outline">{selectedModelData.tier}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button onClick={handleSavePersonality} size="sm">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Model Configuration Tabs */}
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="personality">Personality</TabsTrigger>
                  <TabsTrigger value="background">Background</TabsTrigger>
                  <TabsTrigger value="specialties">Specialties</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
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
                            defaultValue={selectedModelData.personality.name}
                            placeholder="Enter full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="age">Age</Label>
                          <Input
                            id="age"
                            defaultValue={selectedModelData.personality.age}
                            placeholder="Enter age"
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            defaultValue={selectedModelData.personality.location}
                            placeholder="Enter location"
                          />
                        </div>
                        <div>
                          <Label htmlFor="occupation">Occupation</Label>
                          <Input
                            id="occupation"
                            defaultValue={selectedModelData.personality.occupation}
                            placeholder="Enter occupation"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="interests">Interests</Label>
                        <Input
                          id="interests"
                          defaultValue={selectedModelData.personality.interests.join(', ')}
                          placeholder="Fashion, Fitness, Travel..."
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="personality" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Heart className="w-5 h-5" />
                        <span>Personality & Communication</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="personality">Personality Description</Label>
                        <Textarea
                          id="personality"
                          defaultValue={selectedModelData.personality.personality}
                          placeholder="Describe personality traits and characteristics..."
                          className="min-h-[120px]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="communication">Communication Style</Label>
                        <Textarea
                          id="communication"
                          defaultValue={selectedModelData.personality.communicationStyle}
                          placeholder="How does this model communicate?"
                          className="min-h-[100px]"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="background" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <MessageCircle className="w-5 h-5" />
                        <span>Background Story</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <Label htmlFor="background">Background Story</Label>
                        <Textarea
                          id="background"
                          defaultValue={selectedModelData.personality.background}
                          placeholder="Tell the model's backstory..."
                          className="min-h-[150px]"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="specialties" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Sparkles className="w-5 h-5" />
                        <span>Specialties & Services</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="specialties">Specialties</Label>
                        <Input
                          id="specialties"
                          defaultValue={selectedModelData.personality.specialties.join(', ')}
                          placeholder="Custom content, Role-play, GFE..."
                        />
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-medium mb-3">Current Specialties:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedModelData.personality.specialties.map((specialty: string, index: number) => (
                            <Badge key={index} variant="secondary">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <Card className="h-full">
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">Select a model to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}