import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Users,
  TrendingUp,
  DollarSign,
  Crown,
  Star,
  Activity,
  Calendar,
  FileText,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Sample data for OnlyFans agency
const revenueData = [
  { name: "Mon", revenue: 12400, subscribers: 145 },
  { name: "Tue", revenue: 15600, subscribers: 168 },
  { name: "Wed", revenue: 18200, subscribers: 192 },
  { name: "Thu", revenue: 16800, subscribers: 178 },
  { name: "Fri", revenue: 22100, subscribers: 215 },
  { name: "Sat", revenue: 19500, subscribers: 189 },
  { name: "Sun", revenue: 25300, subscribers: 234 },
];

const chatActivityData = [
  { name: "Emily", messages: 342, conversions: 28, revenue: 8200 },
  { name: "Mia", messages: 298, conversions: 22, revenue: 6400 },
  { name: "Sarah", messages: 156, conversions: 15, revenue: 3800 },
  { name: "Luna", messages: 89, conversions: 8, revenue: 2100 },
];

const modelRevenueData = [
  { name: "Emily", value: 35, revenue: 8200, color: "#e11d48" },
  { name: "Mia", value: 28, revenue: 6400, color: "#f59e0b" },
  { name: "Sarah", value: 20, revenue: 3800, color: "#10b981" },
  { name: "Luna", value: 17, revenue: 2100, color: "#3b82f6" },
];

const recentActivity = [
  {
    icon: Star,
    title: "Emily hit $10K milestone",
    subtitle: "Monthly revenue target achieved",
    time: "2 hours ago",
    color: "text-warning",
  },
  {
    icon: Users,
    title: "52 new subscribers today",
    subtitle: "Across all models",
    time: "1 hour ago",
    color: "text-success",
  },
  {
    icon: MessageSquare,
    title: "High chat volume on Mia",
    subtitle: "298 messages sent today",
    time: "30 minutes ago",
    color: "text-primary",
  },
  {
    icon: Calendar,
    title: "Content scheduled for tomorrow",
    subtitle: "5 posts across 3 models",
    time: "15 minutes ago",
    color: "text-accent",
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agency Dashboard</h1>
            <p className="text-muted-foreground">Overview of your OnlyFans agency performance</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right text-sm text-muted-foreground">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              <p className="text-xs">Role: Admin</p>
            </div>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Conversations"
            value="4,829"
            change="+15.4% from last month"
            changeType="positive"
            icon={<MessageSquare />}
          />
          <StatsCard
            title="Active Subscribers"
            value="3,247"
            change="+12.8% from last month"
            changeType="positive"
            icon={<Users />}
          />
          <StatsCard
            title="Messages Today"
            value="1,856"
            change="+24.1% from yesterday"
            changeType="positive"
            icon={<MessageSquare />}
          />
          <StatsCard
            title="Top Model"
            value="Emily"
            change="$25.3K this month"
            changeType="positive"
            icon={<Crown />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue & Subscriber Growth */}
          <Card className="p-6 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Revenue & Subscriber Growth</h3>
                <p className="text-sm text-muted-foreground">Daily performance over the past week</p>
              </div>
              <Button variant="outline" size="sm">7 days</Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="revenue" orientation="left" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="subscribers" orientation="right" stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line 
                  yAxisId="revenue"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  name="Revenue ($)"
                />
                <Line 
                  yAxisId="subscribers"
                  type="monotone" 
                  dataKey="subscribers" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  name="New Subscribers"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Model Chat Performance */}
          <Card className="p-6 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Model Chat Performance</h3>
                <p className="text-sm text-muted-foreground">Messages and conversions by model</p>
              </div>
              <Button variant="outline" size="sm">Today</Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chatActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="messages" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} name="Messages" />
                <Bar dataKey="conversions" fill="hsl(var(--success))" radius={[2, 2, 0, 0]} name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Model Performance & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Model Revenue Distribution */}
          <Card className="lg:col-span-2 p-6 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Model Revenue Distribution</h3>
                <p className="text-sm text-muted-foreground">Revenue breakdown by top performers</p>
              </div>
              <Button variant="outline" size="sm">View All Models</Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-64 w-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={modelRevenueData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {modelRevenueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value}%`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-4 ml-8">
                {modelRevenueData.map((model, index) => (
                  <div key={model.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: model.color }}
                      ></div>
                      <div>
                        <p className="font-medium text-foreground">{model.name}</p>
                        <p className="text-sm text-muted-foreground">{model.value}% of total</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">${model.revenue.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">this month</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 bg-gradient-card border-card-border shadow-card">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                    <activity.icon className={`w-4 h-4 mt-0.5 ${activity.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.subtitle}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-card border-card-border shadow-card hover:shadow-glow transition-all cursor-pointer group">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Add New Model</h4>
                <p className="text-sm text-muted-foreground">Onboard new talent</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-card-border shadow-card hover:shadow-glow transition-all cursor-pointer group">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Chatter Workspace</h4>
                <p className="text-sm text-muted-foreground">Manage conversations</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-card-border shadow-card hover:shadow-glow transition-all cursor-pointer group">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-success" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Content Calendar</h4>
                <p className="text-sm text-muted-foreground">Schedule posts</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-card-border shadow-card hover:shadow-glow transition-all cursor-pointer group">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">View Reports</h4>
                <p className="text-sm text-muted-foreground">Analytics & insights</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}