import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Download,
  TrendingUp,
  Users,
  MessageSquare,
  DollarSign,
  Clock,
  Target,
  FileText,
  Mail,
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
  Area,
  AreaChart,
} from "recharts";

// Mock data for reports
const dailyRevenueData = [
  { date: "Jan 1", revenue: 2400, subscribers: 45, messages: 234 },
  { date: "Jan 2", revenue: 1398, subscribers: 32, messages: 187 },
  { date: "Jan 3", revenue: 9800, subscribers: 78, messages: 456 },
  { date: "Jan 4", revenue: 3908, subscribers: 52, messages: 321 },
  { date: "Jan 5", revenue: 4800, subscribers: 61, messages: 398 },
  { date: "Jan 6", revenue: 3800, subscribers: 48, messages: 289 },
  { date: "Jan 7", revenue: 4300, subscribers: 55, messages: 334 },
];

const modelPerformanceData = [
  { name: "Emily", revenue: 8200, conversions: 28, efficiency: 92 },
  { name: "Mia", revenue: 6400, conversions: 22, efficiency: 87 },
  { name: "Sarah", revenue: 3800, conversions: 15, efficiency: 79 },
  { name: "Luna", revenue: 2100, conversions: 8, efficiency: 65 },
];

const conversionFunnelData = [
  { stage: "Subscribers", count: 3247, percentage: 100, color: "#3b82f6" },
  { stage: "Chat Started", count: 1842, percentage: 57, color: "#10b981" },
  { stage: "Engaged", count: 924, percentage: 28, color: "#f59e0b" },
  { stage: "Converted", count: 342, percentage: 11, color: "#e11d48" },
];

const hourlyActivityData = [
  { hour: "00", messages: 12, conversions: 1 },
  { hour: "01", messages: 8, conversions: 0 },
  { hour: "02", messages: 5, conversions: 0 },
  { hour: "03", messages: 3, conversions: 0 },
  { hour: "04", messages: 4, conversions: 0 },
  { hour: "05", messages: 8, conversions: 1 },
  { hour: "06", messages: 15, conversions: 2 },
  { hour: "07", messages: 28, conversions: 3 },
  { hour: "08", messages: 45, conversions: 5 },
  { hour: "09", messages: 67, conversions: 8 },
  { hour: "10", messages: 89, conversions: 11 },
  { hour: "11", messages: 98, conversions: 12 },
  { hour: "12", messages: 112, conversions: 15 },
  { hour: "13", messages: 134, conversions: 18 },
  { hour: "14", messages: 145, conversions: 19 },
  { hour: "15", messages: 156, conversions: 21 },
  { hour: "16", messages: 167, conversions: 23 },
  { hour: "17", messages: 178, conversions: 25 },
  { hour: "18", messages: 189, conversions: 28 },
  { hour: "19", messages: 198, conversions: 32 },
  { hour: "20", messages: 178, conversions: 29 },
  { hour: "21", messages: 145, conversions: 24 },
  { hour: "22", messages: 98, conversions: 18 },
  { hour: "23", messages: 56, conversions: 12 },
];

const subscriberChurnData = [
  { period: "Week 1", new: 89, churned: 12, net: 77 },
  { period: "Week 2", new: 76, churned: 15, net: 61 },
  { period: "Week 3", new: 94, churned: 8, net: 86 },
  { period: "Week 4", new: 102, churned: 18, net: 84 },
];

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground">Comprehensive insights and performance metrics</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Mail className="w-4 h-4 mr-2" />
              Email Report
            </Button>
            <Button className="bg-gradient-primary">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* KPI Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue Growth</p>
                <p className="text-2xl font-bold text-foreground">+18.2%</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold text-foreground">11.3%</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                <p className="text-2xl font-bold text-foreground">3.2m</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Goal Achievement</p>
                <p className="text-2xl font-bold text-foreground">87%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Report Tabs */}
        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
            <TabsTrigger value="performance">Model Performance</TabsTrigger>
            <TabsTrigger value="conversion">Conversion Funnel</TabsTrigger>
            <TabsTrigger value="activity">Activity Heatmap</TabsTrigger>
          </TabsList>

          {/* Revenue Analysis Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Revenue Trend */}
              <Card className="p-6 bg-gradient-card border-card-border shadow-card">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Daily Revenue Trend</h3>
                    <p className="text-sm text-muted-foreground">Revenue performance over the past week</p>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={dailyRevenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "var(--radius)",
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="hsl(var(--primary))" 
                          fill="hsl(var(--primary))"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Card>

              {/* Subscriber Churn Analysis */}
              <Card className="p-6 bg-gradient-card border-card-border shadow-card">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Subscriber Churn Analysis</h3>
                    <p className="text-sm text-muted-foreground">New vs churned subscribers</p>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={subscriberChurnData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "var(--radius)",
                          }}
                        />
                        <Bar dataKey="new" fill="hsl(var(--success))" name="New Subscribers" />
                        <Bar dataKey="churned" fill="hsl(var(--destructive))" name="Churned" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Model Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card className="p-6 bg-gradient-card border-card-border shadow-card">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Model Performance Comparison</h3>
                  <p className="text-sm text-muted-foreground">Revenue, conversions, and efficiency metrics</p>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={modelPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                      <YAxis yAxisId="revenue" orientation="left" stroke="hsl(var(--muted-foreground))" />
                      <YAxis yAxisId="efficiency" orientation="right" stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                      <Bar yAxisId="revenue" dataKey="revenue" fill="hsl(var(--primary))" name="Revenue ($)" />
                      <Bar yAxisId="revenue" dataKey="conversions" fill="hsl(var(--success))" name="Conversions" />
                      <Line yAxisId="efficiency" type="monotone" dataKey="efficiency" stroke="hsl(var(--warning))" name="Efficiency %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Conversion Funnel Tab */}
          <TabsContent value="conversion" className="space-y-6">
            <Card className="p-6 bg-gradient-card border-card-border shadow-card">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Conversion Funnel Analysis</h3>
                  <p className="text-sm text-muted-foreground">Subscriber journey from initial contact to conversion</p>
                </div>
                <div className="space-y-4">
                  {conversionFunnelData.map((stage, index) => (
                    <div key={stage.stage} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground">{stage.stage}</h4>
                        <div className="text-right">
                          <span className="text-lg font-semibold text-foreground">{stage.count.toLocaleString()}</span>
                          <span className="text-sm text-muted-foreground ml-2">({stage.percentage}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                        <div 
                          className="h-full transition-all duration-500"
                          style={{ 
                            width: `${stage.percentage}%`,
                            backgroundColor: stage.color 
                          }}
                        ></div>
                      </div>
                      {index < conversionFunnelData.length - 1 && (
                        <div className="flex justify-center my-2">
                          <div className="w-0.5 h-4 bg-border"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Activity Heatmap Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="p-6 bg-gradient-card border-card-border shadow-card">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">24-Hour Activity Heatmap</h3>
                  <p className="text-sm text-muted-foreground">Messages and conversions by hour of day</p>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={hourlyActivityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="messages" 
                        stackId="1"
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary))"
                        fillOpacity={0.6}
                        name="Messages"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="conversions" 
                        stackId="2"
                        stroke="hsl(var(--success))" 
                        fill="hsl(var(--success))"
                        fillOpacity={0.8}
                        name="Conversions"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Automated Reports */}
        <Card className="p-6 bg-gradient-card border-card-border shadow-card">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Automated Reports</h3>
                <p className="text-sm text-muted-foreground">Schedule and manage automatic report generation</p>
              </div>
              <Button className="bg-gradient-primary">
                <FileText className="w-4 h-4 mr-2" />
                Setup Schedule
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-muted/30 border-card-border">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">Daily Summary</h4>
                    <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Revenue, conversions, and key metrics</p>
                  <p className="text-xs text-muted-foreground">Sent every day at 9:00 AM</p>
                </div>
              </Card>

              <Card className="p-4 bg-muted/30 border-card-border">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">Weekly Performance</h4>
                    <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Detailed model and team analysis</p>
                  <p className="text-xs text-muted-foreground">Sent every Monday at 8:00 AM</p>
                </div>
              </Card>

              <Card className="p-4 bg-muted/30 border-card-border">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">Monthly Financial</h4>
                    <Badge className="bg-muted/10 text-muted-foreground border-muted/20">Inactive</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Complete financial breakdown</p>
                  <p className="text-xs text-muted-foreground">1st of every month</p>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}