import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Bot,
  FolderOpen,
  TrendingUp,
  ScrollText,
  TestTube,
  Settings,
  ChevronDown,
  ChevronRight,
  Calendar,
  Users,
  
  Vault,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: BarChart3,
  },
  {
    name: "ChatBot",
    href: "/chatbot",
    icon: Bot,
  },
  {
    name: "Models",
    href: "/models",
    icon: Users,
  },
  {
    name: "Vault",
    href: "/vault",
    icon: Vault,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: TestTube,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev =>
      prev.includes(name)
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen w-64 flex-col glass-sidebar rounded-r-3xl">
      {/* Logo */}
      <div className="flex h-16 items-center px-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
            <img 
              src="/lovable-uploads/e0e4ec52-be30-4715-aa76-de0eeba42a9f.png" 
              alt="Bull Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-base font-semibold text-sidebar-foreground truncate">Bullseye ChatBot</h1>
            <p className="text-xs text-muted-foreground">Management Hub</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navigation.map((item) => (
          <div key={item.name}>
            <Link to={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start h-10 px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                  isActive(item.href) && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="w-4 h-4 mr-3" />
                <span className="text-sm font-medium">{item.name}</span>
              </Button>
            </Link>
          </div>
        ))}
      </nav>

      {/* Status indicators */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">AdsPower</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-success">Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}