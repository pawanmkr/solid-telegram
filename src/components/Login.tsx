"use client";

import React from "react";
import { Mail, Lock, Loader } from "lucide-react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate a 2-second form submission
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to the dashboard on successful form submission
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg w-[35%]"
    >
      <div className="space-y-8">
        <div className="border-b border-gray-200 pb-8">
          <h2 className="text-xl font-semibold text-gray-900">Login</h2>

          <div className="mt-6 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <div className="mt-2 flex items-center border rounded-md shadow-sm ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                <Mail className="ml-2 text-gray-400" size={20} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="outline-none block w-full p-2 border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2 flex items-center border rounded-md shadow-sm ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                <Lock className="ml-2 text-gray-400" size={20} />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="outline-none block w-full p-2 border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center w-full rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isLoading ? <Loader className="animate-spin mr-2" /> : null}
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
