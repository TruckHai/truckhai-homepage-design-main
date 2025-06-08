
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bell, X } from "lucide-react";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal = ({ isOpen, onClose }: NotificationModalProps) => {
  const notifications = [
    {
      id: 1,
      title: "New Bid Alert",
      message: "Your bid for Mumbai → Delhi route has been outbid",
      time: "2 mins ago",
      unread: true
    },
    {
      id: 2,
      title: "Route Update",
      message: "Bangalore → Chennai route now accepting bids",
      time: "15 mins ago",
      unread: true
    },
    {
      id: 3,
      title: "Market Alert",
      message: "Delhi → Kolkata prices dropped by 5%",
      time: "1 hour ago",
      unread: false
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-lg shadow-lg">
        <DialogHeader className="flex flex-row items-center justify-between p-6 pb-4">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-truck-red" />
            <DialogTitle className="font-sf-pro text-xl font-semibold text-truck-black">
              Notifications
            </DialogTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1 h-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="px-6 pb-6">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-poppins">No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    notification.unread
                      ? 'bg-red-50 border-red-100'
                      : 'bg-gray-50 border-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-truck-black text-sm">
                      {notification.title}
                    </h4>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-truck-red rounded-full"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {notification.time}
                  </p>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              className="w-full text-truck-red border-truck-red hover:bg-truck-red hover:text-white"
            >
              Mark All as Read
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;
