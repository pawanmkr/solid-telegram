import React from "react";
import TotalDrivers from "@/components/TotalDrivers";
import DailyAttendance from "@/components/DailyAttendance";
import DriverTable from "@/components/DriverTable";
import AddDriver from "@/components/AddDriver";

export default function Page() {
  return (
    <main className="min-h-screen max-w-7xl mx-auto p-8 bg-gray-50 w-[100%]">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Driver Management Dashboard
        </h1>
      </header>
      <div className="flex flex-col gap-y-8">
        {/* CHARTS */}
        <div className="flex gap-x-8">
          <div className="w-full sm:w-1/2 lg:w-1/4 bg-white shadow-md rounded-lg">
            <TotalDrivers />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 bg-white shadow-md rounded-lg">
            <DailyAttendance />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 bg-white shadow-md rounded-lg flex justify-center items-center">
            <AddDriver />
          </div>
        </div>

        {/* DRIVERS LIST */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <DriverTable />
        </div>
      </div>
    </main>
  );
}
