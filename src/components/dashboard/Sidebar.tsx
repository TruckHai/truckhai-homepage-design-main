
import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarItem } from './types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  sidebarItems: SidebarItem[];
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ sidebarItems, isSidebarCollapsed, setIsSidebarCollapsed }: SidebarProps) => {
  const navigate = useNavigate();

  const handleNavigation = (item: SidebarItem) => {
    if (item.route) {
      navigate(item.route);
    }
  };

  return (
    <aside 
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white/98 backdrop-blur-sm border-r border-gray-200/80 shadow-lg transition-all duration-300 z-40 ${
        isSidebarCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        className={`absolute -right-3 top-6 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:border-red-300 hover:bg-red-50 z-50`}
      >
        {isSidebarCollapsed ? (
          <ChevronRight className="w-3 h-3 text-red-500" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-red-500" />
        )}
      </button>

      <ScrollArea className="h-full">
        <div className="p-3 pt-8 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 group relative ${
                  item.isActive
                    ? 'bg-red-500 text-white shadow-lg border border-red-600 transform scale-105'
                    : 'text-gray-600 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-200 hover:shadow-md'
                }`}
                title={isSidebarCollapsed ? item.label : ''}
              >
                <div className={`flex-shrink-0 ${item.isActive ? 'text-white' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {!isSidebarCollapsed && (
                  <span className={`font-semibold text-sm truncate ${item.isActive ? 'text-white' : ''}`}>
                    {item.label}
                  </span>
                )}
                {isSidebarCollapsed && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                    {item.label}
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
