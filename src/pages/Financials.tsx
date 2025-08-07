import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  Upload,
  CreditCard,
  Wallet,
  PieChart,
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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

// Mock financial data
const revenueData = [
  { month: "Jul", subscriptions: 45000, ppv: 15000, tips: 8000, customs: 12000 },
  { month: "Aug", subscriptions: 52000, ppv: 18000, tips: 9500, customs: 14000 },
  { month: "Sep", subscriptions: 48000, ppv: 22000, tips: 11000, customs: 16000 },
  { month: "Oct", subscriptions: 58000, ppv: 25000, tips: 13000, customs: 18000 },
  { month: "Nov", subscriptions: 62000, ppv: 28000, tips: 15000, customs: 21000 },
  { month: "Dec", subscriptions: 69000, ppv: 32000, tips: 17000, customs: 24000 },
];

const modelEarnings = [
  { name: "Emily", earnings: 42000, percentage: 35, color: "#e11d48" },
  { name: "Mia", earnings: 31000, percentage: 26, color: "#f59e0b" },
  { name: "Sarah", earnings: 24000, percentage: 20, color: "#10b981" },
  { name: "Luna", earnings: 18000, percentage: 15, color: "#3b82f6" },
  { name: "Others", earnings: 5000, percentage: 4, color: "#6b7280" },
];

const transactions = [
  {
    id: 1,
    type: "Subscription",
    model: "Emily",
    amount: 250,
    date: "2024-01-15",
    status: "completed",
    subscriber: "Jake123",
  },
  {
    id: 2,
    type: "PPV",
    model: "Mia",
    amount: 45,
    date: "2024-01-15",
    status: "completed",
    subscriber: "Alex_99",
  },
  {
    id: 3,
    type: "Tip",
    model: "Sarah",
    amount: 25,
    date: "2024-01-14",
    status: "completed",
    subscriber: "Mark_Smith",
  },
  {
    id: 4,
    type: "Custom",
    model: "Emily",
    amount: 150,
    date: "2024-01-14",
    status: "pending",
    subscriber: "User456",
  },
];

const expenses = [
  {
    id: 1,
    category: "Marketing",
    description: "Instagram promotion",
    amount: 500,
    date: "2024-01-10",
    model: "Emily",
  },
  {
    id: 2,
    category: "Equipment",
    description: "New camera lens",
    amount: 800,
    date: "2024-01-08",
    model: "All Models",
  },
  {
    id: 3,
    category: "Photoshoot",
    description: "Studio rental",
    amount: 300,
    date: "2024-01-05",
    model: "Mia",
  },
];

const getTransactionTypeColor = (type: string) => {
  switch (type) {
    case "Subscription":
      return "bg-primary/10 text-primary border-primary/20";
    case "PPV":
      return "bg-warning/10 text-warning border-warning/20";
    case "Tip":
      return "bg-success/10 text-success border-success/20";
    case "Custom":
      return "bg-accent/10 text-accent border-accent/20";
    default:
      return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-success/10 text-success border-success/20";
    case "pending":
      return "bg-warning/10 text-warning border-warning/20";
    case "failed":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

export default function Financials() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Financial Tracker</h1>
            <p className="text-muted-foreground">Monitor revenue, expenses, and profitability</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Import CSV
            </Button>
            <Button className="bg-gradient-primary">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">$142,000</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-sm text-success">+18.2%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Profit</p>
                <p className="text-2xl font-bold text-foreground">$127,400</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-sm text-success">+15.8%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-success" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Expenses</p>
                <p className="text-2xl font-bold text-foreground">$14,600</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingDown className="w-4 h-4 text-destructive" />
                  <span className="text-sm text-destructive">-3.2%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-warning" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-card-border shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Profit Margin</p>
                <p className="text-2xl font-bold text-foreground">89.7%</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-sm text-success">+2.1%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <PieChart className="w-6 h-6 text-accent" />
              </div>
            </div>
          </Card>
        </div>

        {/* Revenue Breakdown Chart */}
        <Card className="p-6 bg-gradient-card border-card-border shadow-card">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Revenue Breakdown</h3>
                <p className="text-sm text-muted-foreground">Monthly revenue by source</p>
              </div>
              <Button variant="outline" size="sm">6 Months</Button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Bar dataKey="subscriptions" stackId="a" fill="hsl(var(--primary))" name="Subscriptions" />
                  <Bar dataKey="ppv" stackId="a" fill="hsl(var(--warning))" name="PPV" />
                  <Bar dataKey="tips" stackId="a" fill="hsl(var(--success))" name="Tips" />
                  <Bar dataKey="customs" stackId="a" fill="hsl(var(--accent))" name="Customs" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Model Earnings & Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Model Earnings */}
          <Card className="p-6 bg-gradient-card border-card-border shadow-card">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Model Earnings</h3>
                <p className="text-sm text-muted-foreground">This month's distribution</p>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={modelEarnings}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="earnings"
                    >
                      {modelEarnings.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Earnings"]} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {modelEarnings.map((model, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: model.color }}
                      ></div>
                      <span className="text-sm font-medium text-foreground">{model.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">${model.earnings.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Recent Transactions */}
          <Card className="lg:col-span-2 p-6 bg-gradient-card border-card-border shadow-card">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
                  <p className="text-sm text-muted-foreground">Latest revenue activities</p>
                </div>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getTransactionTypeColor(transaction.type)}>
                            {transaction.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{transaction.model}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{transaction.subscriber} • {transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">${transaction.amount}</p>
                      <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Expenses Tracker */}
        <Card className="p-6 bg-gradient-card border-card-border shadow-card">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Expense Tracker</h3>
                <p className="text-sm text-muted-foreground">Track business expenses and investments</p>
              </div>
              <Button className="bg-gradient-primary">
                Add Expense
              </Button>
            </div>
            
            <div className="space-y-3">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{expense.description}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{expense.category}</span>
                        <span>•</span>
                        <span>{expense.model}</span>
                        <span>•</span>
                        <span>{expense.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-destructive">-${expense.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}