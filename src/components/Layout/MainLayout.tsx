
import React, { ReactNode, useState } from "react";
import { Sidebar } from "../Navigation/Sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: ReactNode;
  title: ReactNode; // Changed from string to ReactNode to accept JSX elements
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 ease-in-out`}
      >
        <Sidebar collapsed={!sidebarOpen} />
      </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-4 text-brand-red"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-brand-red">{title}</h1>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>

        <footer className="py-4 px-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          বাংলা-ভোটস-কানেক্ট © {new Date().getFullYear()} - Political CRM
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
