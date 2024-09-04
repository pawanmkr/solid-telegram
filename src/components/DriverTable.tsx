"use client";

import React, { useState, ChangeEvent, useEffect, ReactNode } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Pencil, Trash2, ChevronDown, ChevronUp, Loader } from "lucide-react";
import { dummyVehicles } from "@/lib/vehicles";

// Custom Alert component with TypeScript props
interface AlertProps {
  children: ReactNode;
  variant?: "default" | "destructive";
}

const Alert: React.FC<AlertProps> = ({ children, variant = "default" }) => {
  const bgColor =
    variant === "destructive"
      ? "bg-red-100 border-red-400 text-red-700"
      : "bg-blue-100 border-blue-400 text-blue-700";
  return (
    <div className={`border-l-4 p-4 ${bgColor}`} role="alert">
      <p className="font-bold">Alert</p>
      <p>{children}</p>
    </div>
  );
};

enum DriverDocumentType {
  DRIVING_LICENSE = "DRIVING_LICENSE",
  PAN_CARD = "PAN_CARD",
  AADHAR_CARD = "AADHAR_CARD",
  SCHOOL_CERTIFICATE = "SCHOOL_CERTIFICATE",
  ADDRESS_PROOF = "ADDRESS_PROOF",
  PHOTO = "PHOTO",
}

export default function DriverTable() {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileType, setSelectedFileType] = useState<DriverDocumentType>(
    DriverDocumentType.DRIVING_LICENSE
  );
  const [uploadResponse, setUploadResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (driverId: number) => {
    if (selectedFile) {
      setIsLoading(true);
      setError("");
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("type", selectedFileType);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/demo/drivers/drivers/${driverId}/document/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          setUploadResponse("Document uploaded and processed successfully.");
          setSelectedFile(null);
          setSelectedFileType(DriverDocumentType.DRIVING_LICENSE);

          // Update the drivers state with the new document
          setDrivers((prevDrivers) =>
            prevDrivers.map((driver) =>
              driver.id === driverId
                ? { ...driver, documents: [...driver.documents, response.data] }
                : driver
            )
          );
        }
      } catch (error: any) {
        console.error("Error uploading document:", error);
        if (error.response) {
          if (error.response.status === 400) {
            setError(
              "Invalid document type or format. Please check and try again."
            );
          } else if (error.response.status === 404) {
            setError(
              "Driver not found. Please refresh the page and try again."
            );
          } else {
            setError(
              "An error occurred during document upload. Please try again."
            );
          }
        } else {
          setError(
            "Network error. Please check your connection and try again."
          );
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Please select a file to upload.");
    }
  };

  const toggleRow = (id: number) => {
    setOpenRow(openRow === id ? null : id);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Driver Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Check-In</TableHead>
          <TableHead>Check-Out</TableHead>
          <TableHead>Assigned Vehicle</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {drivers.map((driver) => (
          <React.Fragment key={driver.id}>
            <Collapsible
              open={openRow === driver.id}
              onOpenChange={() => toggleRow(driver.id)}
              asChild
            >
              <React.Fragment>
                <TableRow className="cursor-pointer hover:bg-gray-50">
                  <CollapsibleTrigger asChild>
                    <TableCell className="flex items-center gap-2 font-medium">
                      {driver.name}
                      {openRow === driver.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </TableCell>
                  </CollapsibleTrigger>
                  <TableCell>{driver.phone}</TableCell>
                  <TableCell>{driver.checkInTime || "00:00:00"}</TableCell>
                  <TableCell>{driver.checkOutTime || "00:00:00"}</TableCell>
                  <TableCell>
                    {driver.vehicle ? driver.vehicle.model : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-x-6">
                      <Pencil className="cursor-pointer" />
                      <Trash2 className="cursor-pointer" />
                    </div>
                  </TableCell>
                </TableRow>
                {openRow === driver.id && (
                  <TableRow className="bg-gray-100">
                    <TableCell colSpan={6}>
                      {/* Vehicle Details */}
                      <div className="bg-white p-4 rounded-md shadow-sm mb-4">
                        <h4 className="font-semibold mb-2">Vehicle Details</h4>
                        <ul className="text-sm text-gray-600 flex">
                          <li className="mr-8">
                            <strong>VIN:</strong> {driver.vehicle?.vin || "N/A"}
                          </li>
                          <li className="mr-8">
                            <strong>Model:</strong>{" "}
                            {driver.vehicle?.model || "N/A"}
                          </li>
                          <li className="mr-8">
                            <strong>Make:</strong>{" "}
                            {driver.vehicle?.make || "N/A"}
                          </li>
                          <li className="mr-8">
                            <strong>Year:</strong>{" "}
                            {driver.vehicle?.year || "N/A"}
                          </li>
                          <li className="mr-8">
                            <strong>Color:</strong>{" "}
                            {driver.vehicle?.color || "N/A"}
                          </li>
                        </ul>
                      </div>

                      {/* Document Details */}
                      <div className="grid grid-cols-2 gap-4">
                        {driver.documents.length > 0 ? (
                          driver.documents.map((doc: any) => (
                            <div
                              key={doc.id}
                              className="bg-white p-4 rounded-md shadow-sm"
                            >
                              <strong>{doc.type}</strong>
                              <ul className="mt-2 text-sm text-gray-600">
                                {Object.entries(doc.details).map(
                                  ([key, value]) =>
                                    typeof value === "string" &&
                                    value.length > 0 ? (
                                      <li key={key}>
                                        <strong>{key}:</strong> {value}
                                      </li>
                                    ) : null
                                )}
                              </ul>
                            </div>
                          ))
                        ) : (
                          <p className="col-span-2 text-gray-500">
                            No documents available
                          </p>
                        )}
                      </div>

                      {/* File Upload */}
                      <div className="mt-4">
                        <div className="flex items-center space-x-4">
                          <input
                            type="file"
                            onChange={handleFileChange}
                            className="border border-gray-300 p-2 rounded-md w-full"
                          />
                          <select
                            className="border border-gray-300 p-2 rounded-md"
                            value={selectedFileType}
                            onChange={(e) =>
                              setSelectedFileType(
                                e.target.value as DriverDocumentType
                              )
                            }
                          >
                            {Object.values(DriverDocumentType).map((type) => (
                              <option key={type} value={type}>
                                {type.replace("_", " ")}
                              </option>
                            ))}
                          </select>
                          <Button
                            variant="outline"
                            className="bg-blue-500 text-white"
                            onClick={() => handleUpload(driver.id)}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <Loader className="animate-spin mr-2" />
                            ) : null}
                            Upload Document
                          </Button>
                        </div>
                        {uploadResponse && <Alert>{uploadResponse}</Alert>}
                        {error && <Alert variant="destructive">{error}</Alert>}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            </Collapsible>
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
}
