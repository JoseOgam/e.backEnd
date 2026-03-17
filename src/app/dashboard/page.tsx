"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type User = {
  username: string;
  email: string;
};

const DashBoard = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({ username: "", email: "" });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <aside className="w-20 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Logo area (matches header height) */}
        <div className="h-16 flex items-center justify-center border-b border-gray-700">
          <span className="text-xl font-bold">🚀</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col items-center justify-center gap-8 text-xl">
          <button className="text-gray-400 hover:text-white transition">
            🏠
          </button>
          <button className="text-gray-400 hover:text-white transition">
            📊
          </button>
          <button className="text-gray-400 hover:text-white transition">
            ⚙️
          </button>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-gray-800 border-b border-gray-700 px-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Dashboard</h1>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg text-sm"
            >
              <span className="font-medium">{user.username}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-sm font-medium">{user.username}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>

                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-700"
                >
                  👤 Profile
                </a>

                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 text-red-400"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg">📈 Analytics</div>
            <div className="bg-gray-800 p-4 rounded-lg">👥 Users</div>
            <div className="bg-gray-800 p-4 rounded-lg">⚙️ Settings</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashBoard;
