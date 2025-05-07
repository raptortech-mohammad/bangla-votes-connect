
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Calendar, UserCheck, LineChart, Settings, Database } from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  to,
  icon,
  label,
  collapsed,
  active
}) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center py-3 px-4 rounded-md transition-all duration-200", 
        collapsed ? "justify-center px-2" : "pr-6", 
        active 
          ? "bg-white text-sidebar-primary-foreground" 
          : "text-sidebar-foreground hover:bg-white/20"
      )}
    >
      <span className="mr-3">{icon}</span>
      {!collapsed && <span className="font-medium">{label}</span>}
    </Link>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed
}) => {
  const location = useLocation();
  const navigationItems = [
    {
      to: "/",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard"
    }, 
    {
      to: "/contacts",
      icon: <Users size={20} />,
      label: "Contacts"
    }, 
    {
      to: "/campaigns",
      icon: <Calendar size={20} />,
      label: "Campaigns"
    }, 
    {
      to: "/volunteers",
      icon: <UserCheck size={20} />,
      label: "Volunteers"
    }, 
    {
      to: "/data-tools",
      icon: <Database size={20} />,
      label: "Data Tools"
    }, 
    {
      to: "/analytics",
      icon: <LineChart size={20} />,
      label: "Analytics"
    }, 
    {
      to: "/settings",
      icon: <Settings size={20} />,
      label: "Settings"
    }
  ];
  
  return (
    <div className="h-full bg-sidebar fixed w-64 shadow-lg z-10 flex flex-col transition-all duration-300 ease-in-out">
      <div className="p-4 border-b border-white/20 flex items-center justify-center">
        {collapsed ? (
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-brand-red font-bold text-lg">
            B
          </div>
        ) : (
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-brand-red font-bold text-lg mr-2">
              B
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">BanglaVotes</h1>
              <p className="text-xs text-white/70">Political CRM</p>
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navigationItems.map(item => (
            <li key={item.to}>
              <NavItem 
                to={item.to} 
                icon={item.icon} 
                label={item.label} 
                collapsed={collapsed} 
                active={location.pathname === item.to} 
              />
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/20">
        {!collapsed && (
          <div className="text-white/70 text-xs">
            <p>Version 1.0.0</p>
          </div>
        )}
      </div>
    </div>
  );
};
