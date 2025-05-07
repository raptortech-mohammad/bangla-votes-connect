import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Calendar, UserCheck, LineChart, Settings, Database, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
interface SidebarProps {
  collapsed: boolean;
}
interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  active: boolean;
  subItems?: {
    to: string;
    label: string;
    icon?: React.ReactNode;
  }[];
}
const NavItem: React.FC<NavItemProps> = ({
  to,
  icon,
  label,
  collapsed,
  active,
  subItems
}) => {
  const location = useLocation();
  const [expanded, setExpanded] = React.useState(active);
  const hasActiveSubItem = subItems?.some(item => location.pathname === item.to);
  const isActive = active || hasActiveSubItem;
  return <div>
      <Link to={to} className={cn("flex items-center py-3 px-4 rounded-md transition-all duration-200", collapsed ? "justify-center px-2" : "pr-6", isActive ? "bg-white text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-white/20")} onClick={() => {
      if (subItems && !collapsed) {
        setExpanded(!expanded);
      }
    }}>
        <span className="mr-3">{icon}</span>
        {!collapsed && <span className="font-medium">{label}</span>}
      </Link>
      
      {subItems && expanded && !collapsed && <div className="ml-10 mt-1 space-y-1">
          {subItems.map(subItem => <Link key={subItem.to} to={subItem.to} className={cn("flex items-center py-2 px-3 rounded-md text-sm transition-all duration-200", location.pathname === subItem.to ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/10")}>
              {subItem.icon && <span className="mr-2">{subItem.icon}</span>}
              <span>{subItem.label}</span>
            </Link>)}
        </div>}
    </div>;
};
export const Sidebar: React.FC<SidebarProps> = ({
  collapsed
}) => {
  const location = useLocation();
  const navigationItems = [{
    to: "/",
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard"
  }, {
    to: "/contacts",
    icon: <Users size={20} />,
    label: "Contacts"
  }, {
    to: "/campaigns",
    icon: <Calendar size={20} />,
    label: "Campaigns"
  }, {
    to: "/volunteers",
    icon: <UserCheck size={20} />,
    label: "Volunteers"
  }, {
    to: "/data-tools",
    icon: <Database size={20} />,
    label: "Data Tools"
  }, {
    to: "/social-media",
    icon: <Facebook size={20} />,
    label: "Social Media",
    subItems: [{
      to: "/social-media",
      label: "Dashboard",
      icon: <LayoutDashboard size={16} />
    }, {
      to: "/social-media?tab=facebook",
      label: "Facebook",
      icon: <Facebook size={16} />
    }, {
      to: "/social-media?tab=instagram",
      label: "Instagram",
      icon: <Instagram size={16} />
    }, {
      to: "/social-media?tab=twitter",
      label: "Twitter",
      icon: <Twitter size={16} />
    }, {
      to: "/social-media?tab=linkedin",
      label: "LinkedIn",
      icon: <Linkedin size={16} />
    }]
  }, {
    to: "/analytics",
    icon: <LineChart size={20} />,
    label: "Analytics"
  }, {
    to: "/settings",
    icon: <Settings size={20} />,
    label: "Settings"
  }];
  return <div className="h-full bg-sidebar fixed w-64 shadow-lg z-10 flex flex-col transition-all duration-300 ease-in-out">
      <div className="p-4 border-b border-white/20 flex items-center justify-center rounded px-0 py-[13px]">
        {collapsed ? <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
            <img src="/lovable-uploads/32bed45b-da2a-4836-b315-eb6705b8b10b.png" alt="BNP Logo" className="w-8 h-8 object-contain" />
          </div> : <div className="flex items-center justify-center p-2 rounded-md bg-[#d21e2d] py-0 px-[22px] my-0 mx-[57px]">
            <img src="/lovable-uploads/32bed45b-da2a-4836-b315-eb6705b8b10b.png" alt="BNP Logo" className="h-8 object-contain" />
            <div className="ml-2 my-0 rounded-sm mx-0">
              <h1 className="text-brand-red text-slate-50 my-0 py-0 text-base font-semibold text-center px-0 mx-[15px]">BANGLADESH
NATIONALIST
PARTY</h1>
              <p className="text-xs text-gray-200 text-center">Political CRM</p>
            </div>
          </div>}
      </div>

      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navigationItems.map(item => <li key={item.to}>
              <NavItem to={item.to} icon={item.icon} label={item.label} collapsed={collapsed} active={location.pathname === item.to} subItems={item.subItems} />
            </li>)}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/20">
        {!collapsed && <div className="text-white/70 text-xs">
            <p>Version 1.0.0</p>
          </div>}
      </div>
    </div>;
};