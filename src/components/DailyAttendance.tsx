"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartDataItem {
  name: string;
  value: number;
}

const COLORS = ["#4CAF50", "#F44336"];

const AttendanceChart: React.FC = () => {
  const chartData: ChartDataItem[] = [
    { name: "Present", value: 275 },
    { name: "Absent", value: 200 },
  ];

  const totalDrivers = chartData.reduce((sum, item) => sum + item.value, 0);
  const presentDrivers =
    chartData.find((item) => item.name === "Present")?.value || 0;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center">Daily Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl font-bold">{presentDrivers}</p>
            <p className="text-sm text-gray-500">Present</p>
          </div>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          {chartData.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center">
              <div
                className="w-3 h-3 mr-1"
                style={{ backgroundColor: COLORS[index] }}
              ></div>
              <span>
                {entry.name}: {entry.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceChart;
