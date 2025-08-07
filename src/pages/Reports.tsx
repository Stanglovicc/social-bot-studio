import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, XCircle, CheckCircle, Clock, RefreshCw } from "lucide-react";

// Mock error logs and profile status data
const errorLogs = [
  {
    id: 1,
    timestamp: "2024-01-07 14:23:12",
    profile: "Emily_Model_01",
    error: "Account suspended - Terms violation",
    status: "banned",
    severity: "critical"
  },
  {
    id: 2,
    timestamp: "2024-01-07 13:45:33",
    profile: "Mia_Model_03",
    error: "Connection timeout - Unable to authenticate",
    status: "broken",
    severity: "high"
  },
  {
    id: 3,
    timestamp: "2024-01-07 12:15:22",
    profile: "Sarah_Model_02",
    error: "Rate limit exceeded - Too many requests",
    status: "limited",
    severity: "medium"
  },
  {
    id: 4,
    timestamp: "2024-01-07 11:30:45",
    profile: "Luna_Model_04",
    error: "Profile verification required",
    status: "pending",
    severity: "low"
  },
  {
    id: 5,
    timestamp: "2024-01-07 10:22:18",
    profile: "Alex_Model_05",
    error: "Payment method declined",
    status: "broken",
    severity: "high"
  },
  {
    id: 6,
    timestamp: "2024-01-07 09:15:33",
    profile: "Kate_Model_06",
    error: "Content policy violation - Manual review required",
    status: "banned",
    severity: "critical"
  },
  {
    id: 7,
    timestamp: "2024-01-07 08:45:12",
    profile: "Zoe_Model_07",
    error: "API endpoint deprecated",
    status: "broken",
    severity: "medium"
  },
  {
    id: 8,
    timestamp: "2024-01-07 07:30:55",
    profile: "Nina_Model_08",
    error: "IP address blocked",
    status: "banned",
    severity: "critical"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "banned":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Banned</Badge>;
    case "broken":
      return <Badge className="bg-warning/10 text-warning border-warning/20">Broken</Badge>;
    case "limited":
      return <Badge className="bg-accent/10 text-accent border-accent/20">Limited</Badge>;
    case "pending":
      return <Badge className="bg-muted/10 text-muted-foreground border-muted/20">Pending</Badge>;
    default:
      return <Badge className="bg-success/10 text-success border-success/20">Active</Badge>;
  }
};

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case "critical":
      return <XCircle className="w-4 h-4 text-destructive" />;
    case "high":
      return <AlertTriangle className="w-4 h-4 text-warning" />;
    case "medium":
      return <Clock className="w-4 h-4 text-accent" />;
    case "low":
      return <CheckCircle className="w-4 h-4 text-muted-foreground" />;
    default:
      return <RefreshCw className="w-4 h-4 text-muted-foreground" />;
  }
};

const profileStatusSummary = {
  total: 25,
  active: 15,
  banned: 3,
  broken: 5,
  limited: 1,
  pending: 1
};

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Error Reports</h1>
            <p className="text-muted-foreground">Profile status monitoring and error logs</p>
          </div>
        </div>

        {/* Profile Status Summary */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card className="p-4 bg-gradient-card border-card-border shadow-card">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{profileStatusSummary.total}</p>
              <p className="text-sm text-muted-foreground">Total Profiles</p>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-card border-card-border shadow-card">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{profileStatusSummary.active}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-card border-card-border shadow-card">
            <div className="text-center">
              <p className="text-2xl font-bold text-destructive">{profileStatusSummary.banned}</p>
              <p className="text-sm text-muted-foreground">Banned</p>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-card border-card-border shadow-card">
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">{profileStatusSummary.broken}</p>
              <p className="text-sm text-muted-foreground">Broken</p>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-card border-card-border shadow-card">
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">{profileStatusSummary.limited}</p>
              <p className="text-sm text-muted-foreground">Limited</p>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-card border-card-border shadow-card">
            <div className="text-center">
              <p className="text-2xl font-bold text-muted-foreground">{profileStatusSummary.pending}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </Card>
        </div>

        {/* Error Logs */}
        <Card className="bg-gradient-card border-card-border shadow-card">
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Recent Error Logs</h3>
                <p className="text-sm text-muted-foreground">Latest errors and profile status updates</p>
              </div>
              
              <div className="space-y-3">
                {errorLogs.map((log) => (
                  <div key={log.id} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30 border border-card-border">
                    <div className="flex-shrink-0 mt-0.5">
                      {getSeverityIcon(log.severity)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h4 className="text-sm font-medium text-foreground">{log.profile}</h4>
                          {getStatusBadge(log.status)}
                        </div>
                        <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{log.error}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}