"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";

export default function AddDriver({ setDrivers }: { setDrivers: any }) {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(""); // Clear any previous status message

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/demo/drivers`,
        {
          name,
          phone,
        }
      );
      if (response.status === 201) {
        setStatus("Driver added successfully.");
        const newDriver = response.data;
        setDrivers((prev: any) => [...prev, newDriver]);
        setLoading(false);
        setIsDialogOpen(false); // Close on success
      } else {
        throw new Error("Unexpected response from the server.");
      }
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      if (error.response?.status === 400) {
        setStatus("Invalid data provided.");
      } else if (error.response?.status === 409) {
        setStatus("Phone number or email already exists.");
      } else {
        setStatus("An error occurred during creation.");
      }
    }
  };

  const handleClose = () => {
    setName("");
    setPhone("");
    setStatus("");
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setIsDialogOpen(true)}
          className="bg-gray-300 text-black px-8 hover:bg-black hover:text-white"
        >
          Add Driver
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Driver</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          {status && (
            <div
              className={`text-sm ${
                status.includes("successfully")
                  ? "text-green-500"
                  : "text-red-500"
              } mt-2`}
            >
              {status}
            </div>
          )}
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={loading}>
              {loading && <Loader className="mr-2 animate-spin" size={16} />}
              {loading ? "Saving..." : "Add"}
            </Button>
            <Button
              variant="outline"
              onClick={handleClose}
              className="ml-2 bg-black text-white hover:bg-gray-700"
            >
              Close
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
