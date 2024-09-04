import React from "react";

interface ProgressProps {
    value: number; // val should be between 0 and 100
    className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, className }) => {
    return (
        <div className={`w-full h-2 bg-gray-200 rounded-full ${className}`}>
            <div
                className="h-full bg-indigo-500 rounded-full"
                style={{ width: `${value}%` }}
            />
        </div>
    );
};
