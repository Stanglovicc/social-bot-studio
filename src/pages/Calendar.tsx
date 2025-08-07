import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar as CalendarIcon,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  Image,
  Video,
  FileText,
  Instagram,
  Twitter,
} from "lucide-react";

// Mock data for content calendar
const calendarEvents = [
  {
    id: 1,
    title: "Emily - Photoshoot Photos",
    type: "photo",
    model: "Emily",
    platform: "OnlyFans",
    time: "2:00 PM",
    status: "scheduled",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "Mia - Instagram Story",
    type: "story",
    model: "Mia",
    platform: "Instagram",
    time: "6:00 PM",
    status: "draft",
    date: "2024-01-15",
  },
  {
    id: 3,
    title: "Sarah - Custom Video",
    type: "video",
    model: "Sarah",
    platform: "OnlyFans",
    time: "8:00 PM",
    status: "ready",
    date: "2024-01-16",
  },
  {
    id: 4,
    title: "Luna - Twitter Teaser",
    type: "photo",
    model: "Luna",
    platform: "Twitter",
    time: "12:00 PM",
    status: "posted",
    date: "2024-01-14",
  },
];

const upcomingDeadlines = [
  {
    title: "Emily's Photoshoot",
    date: "Tomorrow",
    description: "Studio session for new content",
    priority: "high",
  },
  {
    title: "Mia's Custom Request",
    date: "Jan 18",
    description: "Custom video delivery",
    priority: "medium",
  },
  {
    title: "Content Review Meeting",
    date: "Jan 20",
    description: "Weekly content planning",
    priority: "low",
  },
];

const getContentTypeIcon = (type: string) => {
  switch (type) {
    case "photo":
      return <Image className="w-4 h-4" />;
    case "video":
      return <Video className="w-4 h-4" />;
    case "story":
      return <FileText className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "Instagram":
      return <Instagram className="w-4 h-4" />;
    case "Twitter":
      return <Twitter className="w-4 h-4" />;
    default:
      return <CalendarIcon className="w-4 h-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "posted":
      return "bg-success/10 text-success border-success/20";
    case "scheduled":
      return "bg-primary/10 text-primary border-primary/20";
    case "ready":
      return "bg-warning/10 text-warning border-warning/20";
    case "draft":
      return "bg-muted/10 text-muted-foreground border-muted/20";
    default:
      return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "medium":
      return "bg-warning/10 text-warning border-warning/20";
    case "low":
      return "bg-success/10 text-success border-success/20";
    default:
      return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

export default function Calendar() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Content Calendar</h1>
            <p className="text-muted-foreground">Schedule and manage content across all platforms</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Sync Google Calendar
            </Button>
            <Button className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Content
            </Button>
          </div>
        </div>

        {/* Calendar Navigation */}
        <Card className="p-6 bg-gradient-card border-card-border shadow-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-xl font-semibold text-foreground">January 2024</h2>
              <Button variant="outline" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">Week</Button>
              <Button variant="outline" size="sm">Month</Button>
              <Button size="sm" className="bg-gradient-primary">Day</Button>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Today's Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {calendarEvents
                .filter(event => event.date === "2024-01-15")
                .map((event) => (
                  <Card key={event.id} className="p-4 bg-muted/30 border-card-border">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          {getContentTypeIcon(event.type)}
                          <h4 className="font-medium text-foreground">{event.title}</h4>
                        </div>
                        <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getPlatformIcon(event.platform)}
                          <span>{event.platform}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                        <Button size="sm" className="flex-1 bg-gradient-primary">View</Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </Card>

        {/* Content Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* This Week's Content */}
          <Card className="lg:col-span-2 p-6 bg-gradient-card border-card-border shadow-card">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">This Week's Content</h3>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              
              <div className="space-y-3">
                {calendarEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        {getContentTypeIcon(event.type)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.date} at {event.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                      {getPlatformIcon(event.platform)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="p-6 bg-gradient-card border-card-border shadow-card">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Upcoming Deadlines</h3>
              
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-foreground">{deadline.title}</h4>
                      <Badge className={getPriorityColor(deadline.priority)}>{deadline.priority}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{deadline.description}</p>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">{deadline.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full bg-gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Deadline
              </Button>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-card border-card-border shadow-card hover:shadow-glow transition-shadow cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Image className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Schedule Photo</h4>
                <p className="text-sm text-muted-foreground">Add new photo post</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-card-border shadow-card hover:shadow-glow transition-shadow cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-warning" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Schedule Video</h4>
                <p className="text-sm text-muted-foreground">Add new video post</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-card-border shadow-card hover:shadow-glow transition-shadow cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Instagram className="w-5 h-5 text-success" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Instagram Post</h4>
                <p className="text-sm text-muted-foreground">Cross-platform content</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-card-border shadow-card hover:shadow-glow transition-shadow cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Bulk Schedule</h4>
                <p className="text-sm text-muted-foreground">Multiple posts at once</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}