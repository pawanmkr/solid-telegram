"use client";

import React, { useState, useEffect } from "react";
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
import { Progress } from "./ui/progress";

export default function AddDriver() {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(3);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/drivers", {
        name,
        phone,
      });
      console.log(response);
      if (response.status === 201) {
        setStatus("Driver added successfully.");
        setName("");
        setPhone("");
        setCountdown(5);
        const countdownInterval = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(countdownInterval);
          setIsDialogOpen(false);
        }, 5000);
      } else {
        throw new Error("Unexpected response from the server.");
      }
    } catch (error: any) {
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

  useEffect(() => {
    if (status && countdown === 0) {
      setIsDialogOpen(false);
    }
  }, [countdown]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setIsDialogOpen(true)}
          className="bg-black text-white px-8"
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
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
          {status && (
            <div className="mt-4 text-sm text-gray-600">
              <p>{status}</p>
              {countdown > 0 && (
                <Progress value={(countdown / 5) * 100} className="mt-2" />
              )}
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
