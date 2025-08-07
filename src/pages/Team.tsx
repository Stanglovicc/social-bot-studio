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
  MessageSquare,
  Clock,
  TrendingUp,
  UserCheck,
  Settings,
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

// Mock data for team members
const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@agency.com",
    role: "Admin",
    assignedModels: ["Emily", "Mia", "Sarah", "Luna"],
    loginTime: "9:23 AM",
    messagesSent: 234,
    conversions: 18,
    lastSeen: "Online",
    joinDate: "Jan 2023",
    productivity: 92,
    status: "active",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike@agency.com",
    role: "Chatter",
    assignedModels: ["Emily", "Mia"],
    loginTime: "8:45 AM",
    messagesSent: 187,
    conversions: 14,
    lastSeen: "2 min ago",
    joinDate: "Mar 2023",
    productivity: 87,
    status: "active",
  },
  {
    id: 3,
    name: "Jessica Williams",
    email: "jessica@agency.com",
    role: "Model Manager",
    assignedModels: ["Sarah", "Luna"],
    loginTime: "10:15 AM",
    messagesSent: 98,
    conversions: 8,
    lastSeen: "15 min ago",
    joinDate: "Jun 2023",
    productivity: 79,
    status: "active",
  },
  {
    id: 4,
    name: "Alex Rivera",
    email: "alex@agency.com",
    role: "Chatter",
    assignedModels: ["Emily"],
    loginTime: "Not logged in",
    messagesSent: 45,
    conversions: 3,
    lastSeen: "2 days ago",
    joinDate: "Nov 2023",
    productivity: 45,
    status: "inactive",
  },
];

const getRoleColor = (role: string) => {
  switch (role) {
    case "Admin":
      return "bg-primary/10 text-primary border-primary/20";
    case "Chatter":
      return "bg-success/10 text-success border-success/20";
    case "Model Manager":
      return "bg-warning/10 text-warning border-warning/20";
    default:
      return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-success/10 text-success border-success/20";
    case "inactive":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

const getProductivityColor = (productivity: number) => {
  if (productivity >= 80) return "text-success";
  if (productivity >= 60) return "text-warning";
  return "text-destructive";
};

export default function Team() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Team Management</h1>
            <p className="text-muted-foreground">Manage team members and monitor their performance</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Team Member
          </Button>
        </div>

        {/* Team Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Team Members</p>
                <p className="text-2xl font-bold text-foreground">4</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Members</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Messages Today</p>
                <p className="text-2xl font-bold text-foreground">564</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Productivity</p>
                <p className="text-2xl font-bold text-foreground">76%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search team members..."
              className="pl-10 bg-card border-card-border"
            />
          </div>
          <Button variant="outline">All Roles</Button>
          <Button variant="outline">Active Only</Button>
          <Button variant="outline">Today's Activity</Button>
        </div>

        {/* Team Members Table */}
        <Card className="p-6 bg-gradient-card border-card-border shadow-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Assigned Models</TableHead>
                <TableHead>Today's Performance</TableHead>
                <TableHead>Productivity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-semibold text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(member.role)}>{member.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {member.assignedModels.map((model, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {model}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm">{member.messagesSent} messages</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-3 h-3 text-success" />
                        <span className="text-sm text-success">{member.conversions} conversions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{member.loginTime}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all ${
                              member.productivity >= 80 ? 'bg-success' : 
                              member.productivity >= 60 ? 'bg-warning' : 'bg-destructive'
                            }`}
                            style={{ width: `${member.productivity}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-medium ${getProductivityColor(member.productivity)}`}>
                          {member.productivity}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Since {member.joinDate}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                      <p className="text-xs text-muted-foreground">{member.lastSeen}</p>
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
                          View Activity
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Access
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="w-4 h-4 mr-2" />
                          Manage Models
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message History
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Activity Log */}
        <Card className="p-6 bg-gradient-card border-card-border shadow-card">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
                <p className="text-sm text-muted-foreground">Team member activity and login history</p>
              </div>
              <Button variant="outline" size="sm">View Full Log</Button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Sarah Johnson logged in</p>
                    <p className="text-xs text-muted-foreground">Started chatting session with Emily's subscribers</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">9:23 AM</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Mike Chen achieved 14 conversions</p>
                    <p className="text-xs text-muted-foreground">High performance on Emily and Mia's accounts</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">2:45 PM</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Jessica Williams updated content calendar</p>
                    <p className="text-xs text-muted-foreground">Scheduled new posts for Sarah and Luna</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">1:20 PM</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}