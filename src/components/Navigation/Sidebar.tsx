import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Users, Calendar, UserCheck, LineChart,
  Settings, Database, Facebook, Instagram, Twitter, Linkedin,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
}

const navColors: Record<string, { bg: string; text: string; hover: string }> = {
  Dashboard:    { bg: "bg-rose-50",    text: "text-rose-600",    hover: "hover:bg-rose-100" },
  Contacts:     { bg: "bg-blue-50",    text: "text-blue-600",    hover: "hover:bg-blue-100" },
  Campaigns:    { bg: "bg-amber-50",   text: "text-amber-600",   hover: "hover:bg-amber-100" },
  Volunteers:   { bg: "bg-emerald-50", text: "text-emerald-600", hover: "hover:bg-emerald-100" },
  "Data Tools": { bg: "bg-violet-50",  text: "text-violet-600",  hover: "hover:bg-violet-100" },
  "Social Media":{ bg: "bg-sky-50",    text: "text-sky-600",     hover: "hover:bg-sky-100" },
  Analytics:    { bg: "bg-orange-50",  text: "text-orange-600",  hover: "hover:bg-orange-100" },
  Settings:     { bg: "bg-slate-50",   text: "text-slate-600",   hover: "hover:bg-slate-100" },
};

const navIconColors: Record<string, string> = {
  Dashboard:    "text-rose-500",
  Contacts:     "text-blue-500",
  Campaigns:    "text-amber-500",
  Volunteers:   "text-emerald-500",
  "Data Tools": "text-violet-500",
  "Social Media":"text-sky-500",
  Analytics:    "text-orange-500",
  Settings:     "text-slate-500",
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  active: boolean;
  subItems?: { to: string; label: string; icon?: React.ReactNode }[];
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, collapsed, active, subItems }) => {
  const location = useLocation();
  const [expanded, setExpanded] = React.useState(active);
  const hasActiveSubItem = subItems?.some(item => location.pathname === item.to);
  const isActive = active || hasActiveSubItem;
  const colors = navColors[label] || { bg: "bg-muted", text: "text-foreground", hover: "hover:bg-muted" };
  const iconColor = navIconColors[label] || "text-muted-foreground";

  return (
    <div>
      <Link
        to={to}
        className={cn(
          "flex items-center py-2.5 px-3 rounded-lg transition-all duration-200 group",
          collapsed ? "justify-center px-2" : "pr-4",
          isActive
            ? `${colors.bg} ${colors.text} font-semibold shadow-sm`
            : `text-sidebar-foreground ${colors.hover}`
        )}
        onClick={() => {
          if (subItems && !collapsed) setExpanded(!expanded);
        }}
      >
        <span className={cn("mr-3 transition-colors", isActive ? iconColor : "text-sidebar-foreground group-hover:" + iconColor)}>
          {icon}
        </span>
        {!collapsed && <span className="text-sm">{label}</span>}
      </Link>

      {subItems && expanded && !collapsed && (
        <div className="ml-9 mt-1 space-y-0.5">
          {subItems.map(subItem => (
            <Link
              key={subItem.to}
              to={subItem.to}
              className={cn(
                "flex items-center py-2 px-3 rounded-md text-xs transition-all duration-200",
                location.pathname === subItem.to
                  ? `${colors.bg} ${colors.text} font-medium`
                  : `text-muted-foreground ${colors.hover}`
              )}
            >
              {subItem.icon && <span className="mr-2">{subItem.icon}</span>}
              <span>{subItem.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();

  const navigationItems = [
    { to: "/", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/contacts", icon: <Users size={20} />, label: "Contacts" },
    { to: "/campaigns", icon: <Calendar size={20} />, label: "Campaigns" },
    { to: "/volunteers", icon: <UserCheck size={20} />, label: "Volunteers" },
    { to: "/data-tools", icon: <Database size={20} />, label: "Data Tools" },
    {
      to: "/social-media",
      icon: <Facebook size={20} />,
      label: "Social Media",
      subItems: [
        { to: "/social-media", label: "Dashboard", icon: <LayoutDashboard size={14} /> },
        { to: "/social-media?tab=facebook", label: "Facebook", icon: <Facebook size={14} /> },
        { to: "/social-media?tab=instagram", label: "Instagram", icon: <Instagram size={14} /> },
        { to: "/social-media?tab=twitter", label: "Twitter", icon: <Twitter size={14} /> },
        { to: "/social-media?tab=linkedin", label: "LinkedIn", icon: <Linkedin size={14} /> },
      ],
    },
    { to: "/analytics", icon: <LineChart size={20} />, label: "Analytics" },
    { to: "/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <div className="h-full bg-white fixed w-64 border-r border-sidebar-border z-10 flex flex-col transition-all duration-300 ease-in-out">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-center">
        {collapsed ? (
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary">
            <img src="/lovable-uploads/32bed45b-da2a-4836-b315-eb6705b8b10b.png" alt="BNP Logo" className="w-7 h-7 object-contain" />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary shadow-md">
              <img src="/lovable-uploads/32bed45b-da2a-4836-b315-eb6705b8b10b.png" alt="BNP Logo" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground leading-tight">BANGLADESH<br/>NATIONALIST PARTY</h1>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <ul className="space-y-1">
          {navigationItems.map(item => (
            <li key={item.to}>
              <NavItem
                to={item.to}
                icon={item.icon}
                label={item.label}
                collapsed={collapsed}
                active={location.pathname === item.to}
                subItems={(item as any).subItems}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <p className="text-xs text-muted-foreground">Version 1.0.0</p>
        )}
      </div>
    </div>
  );
};
