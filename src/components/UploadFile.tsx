"use client";

import React, { useState } from "react";
import axios from "axios";
import { Upload } from "lucide-react";

function UploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<string>("passport");
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setUploadStatus("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", documentType);

    try {
      const response = await axios.post(
        `/drivers/{id}/document/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setUploadStatus("Document uploaded and processed successfully.");
      } else {
        setUploadStatus("Unexpected response from the server.");
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        setUploadStatus("Invalid document type.");
      } else if (error.response?.status === 404) {
        setUploadStatus("No relevant information found.");
      } else {
        setUploadStatus("An error occurred during the upload.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="col-span-full">
          <label
            htmlFor="file-upload"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Upload Document
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-2">
            <div className="text-center">
              <Upload
                aria-hidden="true"
                className="mx-auto h-12 w-12 text-gray-300"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4  inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>

        {uploadStatus && (
          <p className="mt-4 text-sm text-gray-600">{uploadStatus}</p>
        )}
      </form>
    </div>
  );
}

export default UploadFile;
