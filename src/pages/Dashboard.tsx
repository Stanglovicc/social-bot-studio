import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

// Sample data for OnlyFans agency - organized by time period
const dataByPeriod = {
  today: {
    conversations: { value: "342", change: "+24.1% from yesterday" },
    ongoingChats: { value: "47", change: "+12.3% from yesterday" },
    converted: { value: "28", change: "+8 today" },
    conversionRate: { value: "8.2%", change: "-0.3% from yesterday" },
    revenueData: [
      { name: "6AM", conversations: 1200, converted: 12 },
      { name: "9AM", conversations: 1800, converted: 18 },
      { name: "12PM", conversations: 2400, converted: 24 },
      { name: "3PM", conversations: 2100, converted: 21 },
      { name: "6PM", conversations: 2800, converted: 28 },
      { name: "9PM", conversations: 2200, converted: 22 },
    ],
    chartTitle: "Conversations and Converted",
    chartSubtitle: "Hourly performance today"
  },
  week: {
    conversations: { value: "2,194", change: "+18.7% from last week" },
    ongoingChats: { value: "183", change: "+15.2% from last week" },
    converted: { value: "189", change: "+42 this week" },
    conversionRate: { value: "8.6%", change: "+1.2% from last week" },
    revenueData: [
      { name: "Mon", conversations: 12400, converted: 145 },
      { name: "Tue", conversations: 15600, converted: 168 },
      { name: "Wed", conversations: 18200, converted: 192 },
      { name: "Thu", conversations: 16800, converted: 178 },
      { name: "Fri", conversations: 22100, converted: 215 },
      { name: "Sat", conversations: 19500, converted: 189 },
      { name: "Sun", conversations: 25300, converted: 234 },
    ],
    chartTitle: "Conversations and Converted",
    chartSubtitle: "Daily performance this week"
  },
  month: {
    conversations: { value: "4,829", change: "+15.4% from last month" },
    ongoingChats: { value: "247", change: "+8.3% from last month" },
    converted: { value: "463", change: "+67 this month" },
    conversionRate: { value: "11.2%", change: "+2.1% from last month" },
    revenueData: [
      { name: "Week 1", conversations: 45200, converted: 412 },
      { name: "Week 2", conversations: 52800, converted: 498 },
      { name: "Week 3", conversations: 48600, converted: 456 },
      { name: "Week 4", conversations: 61400, converted: 573 },
    ],
    chartTitle: "Conversations and Converted",
    chartSubtitle: "Weekly performance this month"
  },
  quarter: {
    conversations: { value: "14,832", change: "+22.8% from last quarter" },
    ongoingChats: { value: "312", change: "+18.9% from last quarter" },
    converted: { value: "1,387", change: "+245 this quarter" },
    conversionRate: { value: "9.3%", change: "+1.8% from last quarter" },
    revenueData: [
      { name: "Jan", conversations: 127890, converted: 1234 },
      { name: "Feb", conversations: 145620, converted: 1456 },
      { name: "Mar", conversations: 162340, converted: 1589 },
    ],
    chartTitle: "Conversations and Converted",
    chartSubtitle: "Monthly performance this quarter"
  },
  year: {
    conversations: { value: "58,421", change: "+31.2% from last year" },
    ongoingChats: { value: "394", change: "+25.7% from last year" },
    converted: { value: "5,234", change: "+1,124 this year" },
    conversionRate: { value: "8.9%", change: "+2.4% from last year" },
    revenueData: [
      { name: "Q1", conversations: 435850, converted: 4279 },
      { name: "Q2", conversations: 523640, converted: 5123 },
      { name: "Q3", conversations: 612890, converted: 5967 },
      { name: "Q4", conversations: 578320, converted: 5634 },
    ],
    chartTitle: "Conversations and Converted",
    chartSubtitle: "Quarterly performance this year"
  },
  all: {
    conversations: { value: "147,892", change: "+892% all time growth" },
    ongoingChats: { value: "456", change: "Peak performance" },
    converted: { value: "12,463", change: "Total conversions" },
    conversionRate: { value: "8.4%", change: "Average rate" },
    revenueData: [
      { name: "2022", conversations: 1234567, converted: 12890 },
      { name: "2023", conversations: 1876543, converted: 18934 },
      { name: "2024", conversations: 2150870, converted: 20823 },
    ],
    chartTitle: "Conversations and Converted",
    chartSubtitle: "Yearly performance all time"
  }
};

const chatActivityData = [
  { name: "Emily", messages: 342, conversions: 28, revenue: 8200 },
  { name: "Mia", messages: 298, conversions: 22, revenue: 6400 },
  { name: "Sarah", messages: 156, conversions: 15, revenue: 3800 },
  { name: "Luna", messages: 89, conversions: 8, revenue: 2100 },
];

const modelRevenueData = [
  { name: "Emily", value: 35, revenue: 8200, color: "hsl(210 100% 60%)" },
  { name: "Mia", value: 28, revenue: 6400, color: "hsl(220 80% 40%)" },
  { name: "Sarah", value: 20, revenue: 3800, color: "hsl(210 90% 50%)" },
  { name: "Luna", value: 17, revenue: 2100, color: "hsl(220 70% 30%)" },
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
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  
  // Get current period data
  const currentData = dataByPeriod[selectedPeriod as keyof typeof dataByPeriod];
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
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
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
            value={currentData.conversations.value}
            change={currentData.conversations.change}
            changeType="positive"
            icon={<MessageSquare />}
          />
          <StatsCard
            title="Ongoing Chats"
            value={currentData.ongoingChats.value}
            change={currentData.ongoingChats.change}
            changeType="positive"
            icon={<Users />}
          />
          <StatsCard
            title="Converted"
            value={currentData.converted.value}
            change={currentData.converted.change}
            changeType="positive"
            icon={<MessageSquare />}
          />
          <StatsCard
            title="Conversion Rate"
            value={currentData.conversionRate.value}
            change={currentData.conversionRate.change}
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
                <h3 className="text-lg font-semibold text-foreground">{currentData.chartTitle}</h3>
                <p className="text-sm text-muted-foreground">{currentData.chartSubtitle}</p>
              </div>
              <Button variant="outline" size="sm">{selectedPeriod === 'today' ? 'Hours' : selectedPeriod === 'week' ? 'Days' : selectedPeriod === 'month' ? 'Weeks' : selectedPeriod === 'quarter' ? 'Months' : selectedPeriod === 'year' ? 'Quarters' : 'Years'}</Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentData.revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="conversations" orientation="left" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="converted" orientation="right" stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line 
                  yAxisId="conversations"
                  type="monotone" 
                  dataKey="conversations" 
                  stroke="hsl(210 100% 60%)" 
                  strokeWidth={3}
                  name="Conversations"
                />
                <Line 
                  yAxisId="converted"
                  type="monotone" 
                  dataKey="converted" 
                  stroke="hsl(220 80% 40%)" 
                  strokeWidth={2}
                  name="Converted"
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
                <Bar dataKey="messages" fill="hsl(210 100% 60%)" radius={[2, 2, 0, 0]} name="Messages" />
                <Bar dataKey="conversions" fill="hsl(220 80% 40%)" radius={[2, 2, 0, 0]} name="Conversions" />
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