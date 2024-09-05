"use client";

import React, { useEffect, useState } from "react";
import TotalDrivers from "@/components/TotalDrivers";
import DailyAttendance from "@/components/DailyAttendance";
import DriverTable from "@/components/DriverTable";
import { Notification, NotificationsBox } from "@/components/Notifications";
import { BellIcon } from "@heroicons/react/24/outline";
import { SearchDrivers } from "@/components/SearchDrivers";
import { dummyVehicles } from "@/lib/vehicles";
import axios from "axios";
import AddDriver from "@/components/AddDriver";

export default function Page() {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] =
    useState<boolean>(false);
  const [company, setCompany] = useState<string>("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const companyName = url.searchParams.get("company");
    if (companyName)
      setCompany(companyName.charAt(0).toUpperCase() + companyName.slice(1));
    // Simulate a new driver added notification
    setNotifications((notifications) => [
      {
        id: Math.random().toString(36).substring(7),
        title: "New Driver Added",
        description: "A new driver has been added to the system.",
        time: new Date().toLocaleTimeString(),
      },
      ...notifications,
    ]);
  }, []);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/demo/drivers`
        );
        if (Array.isArray(response.data)) {
          // Assign random dummy vehicle to each driver
          const driversWithVehicles = response.data.map((driver) => ({
            ...driver,
            vehicle:
              dummyVehicles[Math.floor(Math.random() * dummyVehicles.length)],
          }));
          setDrivers(driversWithVehicles);
        } else {
          console.error("Expected an array but got:", response.data);
          setDrivers([]);
        }
      } catch (error) {
        console.error("Error fetching drivers:", error);
        setError("Failed to fetch drivers. Please try again later.");
      }
    };
    fetchDrivers();
  }, []);

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const clearNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
    toggleNotificationsBox();
  };

  const toggleNotificationsBox = () => {
    setIsNotificationsOpen((prev) => !prev);
  };

  return (
    <main className="max-w-7xl mx-auto pt-4 bg-[#ededed] h-[100vh] relative">
      <div className="top-bar flex w-full justify-between mb-4">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            {company ? `${company}, Dashboard` : "Dashboard"}
          </h1>
          {/* Notification Toggle Button */}
          <button
            onClick={toggleNotificationsBox}
            className="p-3 relative z-40 rounded-full h-min"
          >
            <BellIcon className="w-6 h-6" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {notifications.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-x-8 items-center">
          {/* Seach Box */}
          <SearchDrivers setDrivers={setDrivers} />

          {/* Add Driver Button */}
          <AddDriver setDrivers={setDrivers} />

          {/* Automate workflow button */}
          <button className="bg-black text-white rounded-sm h-min py-2 px-4">
            Automate Workflow
          </button>
        </div>
      </div>
      <div className="flex w-full gap-x-4">
        {/* CHARTS */}
        <div className="flex flex-col gap-y-4 w-[30%]">
          <div className="bg-white shadow-md rounded-lg">
            <TotalDrivers />
          </div>
          <div className="bg-white shadow-md rounded-lg">
            <DailyAttendance />
          </div>
        </div>

        {/* DRIVERS LIST */}
        <div className="flex bg-white shadow-sm rounded-lg p-6 w-full">
          <DriverTable
            drivers={drivers}
            error={error}
            setDrivers={setDrivers}
            setError={setError}
          />
        </div>
      </div>

      {/* Notification Box */}
      {isNotificationsOpen && (
        <NotificationsBox
          notifications={notifications}
          onClearAll={clearAllNotifications}
          onClearNotification={clearNotification}
        />
      )}
    </main>
  );
}
