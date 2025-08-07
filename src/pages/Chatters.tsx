import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  Clock,
  TrendingUp,
  Users,
  Search,
  Filter,
  Send,
  Heart,
  DollarSign,
  FileText,
} from "lucide-react";

// Mock data for chatter workspace
const activeChats = [
  {
    id: 1,
    subscriberName: "Jake123",
    modelName: "Emily",
    lastMessage: "Can we do a custom video call?",
    timeAgo: "2 min ago",
    revenue: 150,
    mood: "interested",
    priority: "high",
  },
  {
    id: 2,
    subscriberName: "Alex_99",
    modelName: "Mia",
    lastMessage: "Thanks for the photos! 😍",
    timeAgo: "5 min ago",
    revenue: 45,
    mood: "happy",
    priority: "medium",
  },
  {
    id: 3,
    subscriberName: "Mark_Smith",
    modelName: "Sarah",
    lastMessage: "When will you post new content?",
    timeAgo: "12 min ago",
    revenue: 0,
    mood: "neutral",
    priority: "low",
  },
];

const messageTemplates = [
  {
    id: 1,
    category: "Greetings",
    title: "Welcome New Subscriber",
    content: "Hey babe! 😘 Thanks for subscribing! I'm so excited to have you here. Send me a message and let me know what you're looking for! 💕",
    usage: 145,
  },
  {
    id: 2,
    category: "PPV",
    title: "Custom Content Offer",
    content: "I have something special just for you 😉 Would you be interested in a custom video? I can make exactly what you want for $50 💋",
    usage: 89,
  },
  {
    id: 3,
    category: "Engagement",
    title: "Check-in Message",
    content: "Hey sweetie! 💕 How has your day been? I was thinking about you and wanted to see how you're doing! What are you up to tonight? 😘",
    usage: 67,
  },
  {
    id: 4,
    category: "Tips",
    title: "Tip Request",
    content: "You're always so sweet to me! 🥰 If you want to make me smile even more, I'd love a little tip to brighten my day! Every bit helps 💖",
    usage: 123,
  },
];

const subscriberNotes = [
  {
    id: 1,
    subscriberName: "Jake123",
    model: "Emily",
    notes: "Likes roleplay scenarios, prefers video calls, big spender, responds well to flirty messages",
    lastPurchase: "$150 custom video",
    totalSpent: 850,
    preferences: ["Custom videos", "Roleplay", "Video calls"],
  },
  {
    id: 2,
    subscriberName: "Alex_99",
    model: "Mia",
    notes: "Enjoys casual conversation, tips regularly, likes behind-the-scenes content",
    lastPurchase: "$25 tip",
    totalSpent: 340,
    preferences: ["Photos", "Tips", "Casual chat"],
  },
  {
    id: 3,
    subscriberName: "Mark_Smith",
    model: "Sarah",
    notes: "New subscriber, still building relationship, asks lots of questions",
    lastPurchase: "Subscription only",
    totalSpent: 15,
    preferences: ["Q&A", "Getting to know"],
  },
];

const getChatPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "medium":
      return "bg-warning/10 text-warning border-warning/20";
    case "low":
      return "bg-muted/10 text-muted-foreground border-muted/20";
    default:
      return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

export default function Chatters() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Chatter Workspace</h1>
            <p className="text-muted-foreground">Manage conversations and maximize conversions</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-gradient-primary">
              <Send className="w-4 h-4 mr-2" />
              Quick Message
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Chats</p>
                <p className="text-2xl font-bold text-foreground">23</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold text-foreground">18.5%</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold text-foreground">3.2m</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue Today</p>
                <p className="text-2xl font-bold text-foreground">$2,340</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="chats" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chats">Active Chats</TabsTrigger>
            <TabsTrigger value="templates">Message Templates</TabsTrigger>
            <TabsTrigger value="notes">Subscriber Notes</TabsTrigger>
          </TabsList>

          {/* Active Chats Tab */}
          <TabsContent value="chats" className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10 bg-card border-card-border"
                />
              </div>
              <Button variant="outline">All Models</Button>
              <Button variant="outline">High Priority</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {activeChats.map((chat) => (
                <Card key={chat.id} className="p-4 bg-gradient-card border-card-border shadow-card hover:shadow-glow transition-shadow cursor-pointer">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{chat.subscriberName}</h4>
                        <p className="text-sm text-muted-foreground">Chatting with {chat.modelName}</p>
                      </div>
                      <Badge className={getChatPriorityColor(chat.priority)}>{chat.priority}</Badge>
                    </div>
                    
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <p className="text-sm text-foreground">{chat.lastMessage}</p>
                      <p className="text-xs text-muted-foreground mt-1">{chat.timeAgo}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-success" />
                        <span className="text-sm font-medium text-success">${chat.revenue}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{chat.mood}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-gradient-primary">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Open Chat
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Message Templates Tab */}
          <TabsContent value="templates" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  className="pl-10 bg-card border-card-border"
                />
              </div>
              <Button className="bg-gradient-primary">
                <FileText className="w-4 h-4 mr-2" />
                New Template
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {messageTemplates.map((template) => (
                <Card key={template.id} className="p-6 bg-gradient-card border-card-border shadow-card">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{template.title}</h4>
                        <Badge variant="outline" className="mt-1">{template.category}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Used {template.usage} times
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-primary">
                      <p className="text-sm text-foreground">{template.content}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                      <Button size="sm" className="flex-1 bg-gradient-primary">
                        Use Template
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Subscriber Notes Tab */}
          <TabsContent value="notes" className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search subscribers..."
                  className="pl-10 bg-card border-card-border"
                />
              </div>
              <Button variant="outline">All Models</Button>
              <Button variant="outline">High Value</Button>
            </div>

            <div className="space-y-4">
              {subscriberNotes.map((note) => (
                <Card key={note.id} className="p-6 bg-gradient-card border-card-border shadow-card">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{note.subscriberName}</h4>
                        <p className="text-sm text-muted-foreground">Model: {note.model}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">${note.totalSpent}</p>
                        <p className="text-sm text-muted-foreground">Total spent</p>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-foreground">{note.notes}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">Last Purchase:</p>
                        <p className="text-sm text-muted-foreground">{note.lastPurchase}</p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {note.preferences.map((pref, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {pref}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Start Conversation
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}