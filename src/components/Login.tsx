import React from "react";
import { User, Phone } from "lucide-react";

function Login() {
    return (
        <form className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg w-[35%]">
            <div className="space-y-8">
                <div className="border-b border-gray-200 pb-8">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Create Driver
                    </h2>

                    <div className="mt-6 space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Driver Name
                            </label>
                            <div className="mt-2 flex items-center border rounded-md shadow-sm ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                                <User
                                    className="ml-2 text-gray-400"
                                    size={20}
                                />
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Full Name"
                                    className="block w-full p-2 border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="Phonenumber"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Phone number
                            </label>
                            <div className="mt-2 flex items-center border rounded-md shadow-sm ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                                <Phone
                                    className="ml-2 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type="number"
                                    id="Phonenumber"
                                    name="Phonenumber"
                                    placeholder="6280183034"
                                    className="block w-full p-2 border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    defaultValue={""}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Create Driver
                </button>
            </div>
        </form>
    );
}

export default Login;
