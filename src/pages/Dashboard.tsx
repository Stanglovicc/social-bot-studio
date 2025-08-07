import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Users,
  TrendingUp,
  DollarSign,
  Bot,
  Instagram,
  Twitter,
  Camera,
  Activity,
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

const conversationData = [
  { name: "Mon", conversations: 2400, conversions: 24 },
  { name: "Tue", conversations: 1398, conversions: 18 },
  { name: "Wed", conversations: 9800, conversions: 42 },
  { name: "Thu", conversations: 3908, conversions: 31 },
  { name: "Fri", conversations: 4800, conversions: 35 },
  { name: "Sat", conversations: 3800, conversions: 28 },
  { name: "Sun", conversations: 4300, conversions: 33 },
];

const platformData = [
  { name: "Instagram", value: 45, color: "#E1306C" },
  { name: "Twitter", value: 35, color: "#1DA1F2" },
  { name: "Snapchat", value: 20, color: "#FFFC00" },
];

const modelPerformance = [
  { name: "Emily", conversations: 1200, conversions: 48, revenue: 2400 },
  { name: "Mia", conversations: 950, conversions: 35, revenue: 1850 },
  { name: "Sofia", conversations: 720, conversions: 28, revenue: 1440 },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your AI chatbot performance overview.</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              Export Report
            </Button>
            <Button size="sm" className="bg-gradient-primary">
              <Bot className="w-4 h-4 mr-2" />
              Quick Deploy
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Conversations"
            value="12,345"
            change="+12.5% from last week"
            changeType="positive"
            icon={<MessageSquare />}
          />
          <StatsCard
            title="Active Models"
            value="3"
            change="2 online now"
            changeType="positive"
            icon={<Bot />}
          />
          <StatsCard
            title="Conversion Rate"
            value="4.2%"
            change="+0.8% from last week"
            changeType="positive"
            icon={<TrendingUp />}
          />
          <StatsCard
            title="Revenue"
            value="$8,456"
            change="+18.2% from last week"
            changeType="positive"
            icon={<DollarSign />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conversations Over Time */}
          <Card className="p-6 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Conversations & Conversions</h3>
              <Button variant="outline" size="sm">7 days</Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversationData}>
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
                <Line type="monotone" dataKey="conversations" stroke="hsl(var(--primary))" strokeWidth={3} />
                <Line type="monotone" dataKey="conversions" stroke="hsl(var(--success))" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Platform Breakdown */}
          <Card className="p-6 bg-gradient-card border-card-border shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-6">Platform Distribution</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              {platformData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-muted-foreground">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Model Performance Table */}
        <Card className="p-6 bg-gradient-card border-card-border shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Model Performance</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Model</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Conversations</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Conversions</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Revenue</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {modelPerformance.map((model) => (
                  <tr key={model.name} className="border-b border-border/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">{model.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-foreground">{model.conversations.toLocaleString()}</td>
                    <td className="py-3 px-4 text-foreground">{model.conversions}</td>
                    <td className="py-3 px-4 text-foreground">${model.revenue.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-sm text-success">Active</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-card border-card-border shadow-card hover:shadow-glow transition-shadow cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Deploy New Model</h4>
                <p className="text-sm text-muted-foreground">Launch a new AI personality</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-card-border shadow-card hover:shadow-glow transition-shadow cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Monitor Logs</h4>
                <p className="text-sm text-muted-foreground">Check recent activity</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-card-border shadow-card hover:shadow-glow transition-shadow cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">View Analytics</h4>
                <p className="text-sm text-muted-foreground">Deep dive into metrics</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}