import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Plus,
  Search,
  Star,
  TrendingUp,
  DollarSign,
  MessageSquare,
  Calendar,
  Eye,
  Edit,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for models
const modelsData = [
  {
    id: 1,
    name: "Emily Rose",
    username: "@emily_rose",
    tier: "Premium",
    subscribers: 2847,
    dailyRevenue: 1240,
    monthlyRevenue: 25800,
    chatConversions: 28,
    totalMessages: 342,
    status: "Active",
    lastActive: "2 hours ago",
    avatar: "ER",
    growth: "+12.5%",
  },
  {
    id: 2,
    name: "Mia Santos",
    username: "@mia_santos",
    tier: "Premium",
    subscribers: 1923,
    dailyRevenue: 980,
    monthlyRevenue: 18600,
    chatConversions: 22,
    totalMessages: 298,
    status: "Active",
    lastActive: "1 hour ago",
    avatar: "MS",
    growth: "+8.3%",
  },
  {
    id: 3,
    name: "Sarah Kim",
    username: "@sarah_kim",
    tier: "Basic",
    subscribers: 1156,
    dailyRevenue: 520,
    monthlyRevenue: 12400,
    chatConversions: 15,
    totalMessages: 156,
    status: "Active",
    lastActive: "4 hours ago",
    avatar: "SK",
    growth: "+5.7%",
  },
  {
    id: 4,
    name: "Luna Martinez",
    username: "@luna_martinez",
    tier: "Basic",
    subscribers: 734,
    dailyRevenue: 290,
    monthlyRevenue: 7800,
    chatConversions: 8,
    totalMessages: 89,
    status: "Inactive",
    lastActive: "2 days ago",
    avatar: "LM",
    growth: "-2.1%",
  },
];

const getTierColor = (tier: string) => {
  switch (tier) {
    case "Premium":
      return "bg-warning/10 text-warning border-warning/20";
    case "Basic":
      return "bg-muted/10 text-muted-foreground border-muted/20";
    default:
      return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-success/10 text-success border-success/20";
    case "Inactive":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

export default function Models() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Model Management</h1>
            <p className="text-muted-foreground">Manage your talent and track their performance</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add New Model
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Models</p>
                <p className="text-2xl font-bold text-foreground">4</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Models</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Premium Models</p>
                <p className="text-2xl font-bold text-foreground">2</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">$64.6K</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search models..."
              className="pl-10 bg-card border-card-border"
            />
          </div>
          <Button variant="outline">All Status</Button>
          <Button variant="outline">All Tiers</Button>
        </div>

        {/* Models Table */}
        <Card className="p-6 bg-gradient-card border-card-border shadow-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Subscribers</TableHead>
                <TableHead>Daily Revenue</TableHead>
                <TableHead>Monthly Revenue</TableHead>
                <TableHead>Chat Performance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modelsData.map((model) => (
                <TableRow key={model.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-semibold text-primary">
                        {model.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{model.name}</p>
                        <p className="text-sm text-muted-foreground">{model.username}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTierColor(model.tier)}>{model.tier}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{model.subscribers.toLocaleString()}</p>
                      <p className="text-sm text-success">{model.growth}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-foreground">${model.dailyRevenue.toLocaleString()}</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-foreground">${model.monthlyRevenue.toLocaleString()}</p>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm">{model.totalMessages} msgs</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-3 h-3 text-success" />
                        <span className="text-sm text-success">{model.chatConversions} conversions</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={getStatusColor(model.status)}>{model.status}</Badge>
                      <p className="text-xs text-muted-foreground">{model.lastActive}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Content
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Chat Analytics
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
}