import React from "react";

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
}

interface NotificationsBoxProps {
  notifications: Notification[];
  onClearAll: () => void;
  onClearNotification: (id: string) => void;
}

export const NotificationsBox: React.FC<NotificationsBoxProps> = ({
  notifications,
  onClearAll,
  onClearNotification,
}) => {
  return (
    <div className="fixed bottom-4 left-4 z-50 w-120 bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="p-4">
        <button
          onClick={onClearAll}
          className="mb-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Clear All
        </button>
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="relative mb-4 p-4 border border-gray-200 rounded-lg shadow-sm"
            >
              <button
                onClick={() => onClearNotification(notification.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-600"
              >
                &times;
              </button>
              <h3 className="text-lg font-semibold text-gray-800">
                {notification.title}
              </h3>
              <p className="text-gray-600">{notification.description}</p>
              <p className="mt-2 text-sm text-gray-400">{notification.time}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
