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
  Instagram,
  Twitter,
  Camera,
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
    name: "Chatbot",
    href: "/chatbot",
    icon: Bot,
    children: [
      { name: "Platform Selector", href: "/chatbot/platforms" },
      { name: "Model Selector", href: "/chatbot/models" },
      { name: "Bot Settings", href: "/chatbot/settings" },
      { name: "AdsPower Accounts", href: "/chatbot/adspower" },
    ],
  },
  {
    name: "Content Vault",
    href: "/content",
    icon: FolderOpen,
    children: [
      { name: "Emily", href: "/content/emily" },
      { name: "Mia", href: "/content/mia" },
      { name: "Add New Model", href: "/content/add" },
    ],
  },
  {
    name: "Statistics",
    href: "/statistics",
    icon: TrendingUp,
  },
  {
    name: "Logs",
    href: "/logs",
    icon: ScrollText,
  },
  {
    name: "Tester",
    href: "/tester",
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
  const [expandedItems, setExpandedItems] = useState<string[]>(["Chatbot", "Content Vault"]);

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
    <div className="flex h-screen w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">AI Dashboard</h1>
            <p className="text-xs text-muted-foreground">Chatbot Manager</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navigation.map((item) => (
          <div key={item.name}>
            {item.children ? (
              <Collapsible
                open={expandedItems.includes(item.name)}
                onOpenChange={() => toggleExpanded(item.name)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-between h-10 px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                      isActive(item.href) && "bg-sidebar-accent text-sidebar-accent-foreground"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    {expandedItems.includes(item.name) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 mt-1">
                  {item.children.map((child) => (
                    <Link key={child.href} to={child.href}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start h-9 px-6 ml-3 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                          isActive(child.href) && "bg-sidebar-accent text-sidebar-accent-foreground"
                        )}
                      >
                        {child.name}
                      </Button>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
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
            )}
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
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">OpenAI API</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-success">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}