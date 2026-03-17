"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSignup = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("signup failed", error.message);
    }
  };

  return (
    <div className=" w-full">
      <form className="grid justify-center items-center">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={user.username}
            onChange={(e: any) =>
              setUser({ ...user, username: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={user.email}
            onChange={(e: any) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div>
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
        <div className="flex items-center justify-center mb-2 pt-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={onSignup}
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
