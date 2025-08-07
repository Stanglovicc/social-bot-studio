import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: ReactNode;
  className?: string;
}

export function StatsCard({ title, value, change, changeType = "neutral", icon, className }: StatsCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-success";
      case "negative":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className={cn("p-6 glass-card shadow-card h-full flex flex-col", className)}>
      <div className="flex items-center justify-between h-full">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {change && (
              <p className={cn("text-xs font-medium", getChangeColor())}>
                {change}
              </p>
            )}
          </div>
        </div>
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <div className="text-primary w-6 h-6">
            {icon}
          </div>
        </div>
      </div>
    </Card>
  );
}