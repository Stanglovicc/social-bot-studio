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

const chatActivityDataByPeriod = {
  today: [
    { name: "Emily", messages: 342, conversions: 28, revenue: 8200 },
    { name: "Mia", messages: 298, conversions: 22, revenue: 6400 },
    { name: "Sarah", messages: 156, conversions: 15, revenue: 3800 },
    { name: "Luna", messages: 89, conversions: 8, revenue: 2100 },
  ],
  week: [
    { name: "Emily", messages: 2394, conversions: 196, revenue: 57400 },
    { name: "Mia", messages: 2086, conversions: 154, revenue: 44800 },
    { name: "Sarah", messages: 1092, conversions: 105, revenue: 26600 },
    { name: "Luna", messages: 623, conversions: 56, revenue: 14700 },
  ],
  month: [
    { name: "Emily", messages: 10260, conversions: 842, revenue: 246200 },
    { name: "Mia", messages: 8934, conversions: 658, revenue: 192400 },
    { name: "Sarah", messages: 4680, conversions: 450, revenue: 114200 },
    { name: "Luna", messages: 2673, conversions: 240, revenue: 63100 },
  ],
  quarter: [
    { name: "Emily", messages: 30780, conversions: 2526, revenue: 738600 },
    { name: "Mia", messages: 26802, conversions: 1974, revenue: 577200 },
    { name: "Sarah", messages: 14040, conversions: 1350, revenue: 342600 },
    { name: "Luna", messages: 8019, conversions: 720, revenue: 189300 },
  ],
  year: [
    { name: "Emily", messages: 123120, conversions: 10104, revenue: 2954400 },
    { name: "Mia", messages: 107208, conversions: 7896, revenue: 2308800 },
    { name: "Sarah", messages: 56160, conversions: 5400, revenue: 1370400 },
    { name: "Luna", messages: 32076, conversions: 2880, revenue: 757200 },
  ],
  all: [
    { name: "Emily", messages: 246240, conversions: 20208, revenue: 5908800 },
    { name: "Mia", messages: 214416, conversions: 15792, revenue: 4617600 },
    { name: "Sarah", messages: 112320, conversions: 10800, revenue: 2740800 },
    { name: "Luna", messages: 64152, conversions: 5760, revenue: 1514400 },
  ]
};

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
  const currentChatData = chatActivityDataByPeriod[selectedPeriod as keyof typeof chatActivityDataByPeriod];
  return (
    <DashboardLayout>
      <div className="space-y-4 h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Agency Dashboard</h1>
            <p className="text-sm text-muted-foreground">Overview of your OnlyFans agency performance</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right text-xs text-muted-foreground">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              <p className="text-xs">Role: Admin</p>
            </div>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-28 h-8">
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
            <Button variant="outline" size="sm" className="h-8">
              <FileText className="w-3 h-3 mr-1" />
              Export
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
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
        <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
          {/* Conversations & Conversions Chart */}
          <Card className="p-4 bg-gradient-to-br from-background via-background/95 to-primary/5 border-primary/10 shadow-lg flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {currentData.chartTitle}
                </h3>
                <p className="text-xs text-muted-foreground flex items-center">
                  <Activity className="w-3 h-3 mr-1" />
                  {currentData.chartSubtitle}
                </p>
              </div>
              <div className="px-2 py-1 bg-primary/10 rounded-md">
                <span className="text-xs font-medium text-primary">
                  {selectedPeriod === 'today' ? 'Hours' : selectedPeriod === 'week' ? 'Days' : selectedPeriod === 'month' ? 'Weeks' : selectedPeriod === 'quarter' ? 'Months' : selectedPeriod === 'year' ? 'Quarters' : 'Years'}
                </span>
              </div>
            </div>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData.revenueData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="conversationsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(210 100% 60%)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(210 100% 60%)" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="convertedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(145 63% 42%)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(145 63% 42%)" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 4" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    yAxisId="conversations" 
                    orientation="left" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    yAxisId="converted" 
                    orientation="right" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Line 
                    yAxisId="conversations"
                    type="monotone" 
                    dataKey="conversations" 
                    stroke="hsl(210 100% 60%)" 
                    strokeWidth={2}
                    name="Conversations"
                    dot={{ fill: "hsl(210 100% 60%)", strokeWidth: 1, r: 3 }}
                    activeDot={{ r: 4, stroke: "hsl(210 100% 60%)", strokeWidth: 1, fill: "white" }}
                  />
                  <Line 
                    yAxisId="converted"
                    type="monotone" 
                    dataKey="converted" 
                    stroke="hsl(145 63% 42%)" 
                    strokeWidth={2}
                    name="Converted"
                    strokeDasharray="3 3"
                    dot={{ fill: "hsl(145 63% 42%)", strokeWidth: 1, r: 3 }}
                    activeDot={{ r: 4, stroke: "hsl(145 63% 42%)", strokeWidth: 1, fill: "white" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-2 pt-2 border-t border-border/50">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
                <span className="text-xs font-medium text-muted-foreground">Conversations</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-green-600"></div>
                <span className="text-xs font-medium text-muted-foreground">Converted</span>
              </div>
            </div>
          </Card>

          {/* Model Performance Chart */}
          <Card className="p-4 bg-gradient-to-br from-background via-background/95 to-secondary/5 border-secondary/10 shadow-lg flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-foreground bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
                  Model Performance
                </h3>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Messages and conversions by model
                </p>
              </div>
              <div className="px-2 py-1 bg-secondary/10 rounded-md">
                <span className="text-xs font-medium text-secondary">
                  {selectedPeriod === 'today' ? 'Today' : selectedPeriod === 'week' ? 'This Week' : selectedPeriod === 'month' ? 'This Month' : selectedPeriod === 'quarter' ? 'This Quarter' : selectedPeriod === 'year' ? 'This Year' : 'All Time'}
                </span>
              </div>
            </div>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentChatData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="messagesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(220 70% 60%)" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="hsl(220 70% 60%)" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="conversionsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(262 83% 58%)" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="hsl(262 83% 58%)" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 4" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar 
                    dataKey="messages" 
                    fill="url(#messagesGradient)" 
                    radius={[4, 4, 0, 0]} 
                    name="Messages"
                  />
                  <Bar 
                    dataKey="conversions" 
                    fill="url(#conversionsGradient)" 
                    radius={[4, 4, 0, 0]} 
                    name="Conversions"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-2 pt-2 border-t border-border/50">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
                <span className="text-xs font-medium text-muted-foreground">Messages</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-600"></div>
                <span className="text-xs font-medium text-muted-foreground">Conversions</span>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
}