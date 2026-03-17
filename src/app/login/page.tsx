"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);

      router.push("/dashboard");
      return response;
    } catch (error: any) {
      console.log("Login failed", error.message);
    }
  };
  return (
    <div className=" w-full">
      <form className="grid justify-center items-center ">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={user.email}
            onChange={(e: any) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={user.password}
            onChange={(e: any) =>
              setUser({ ...user, password: e.target.value })
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={onLogin}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
