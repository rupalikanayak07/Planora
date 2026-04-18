import React, { useEffect, useState } from "react";
import axios from "axios";

const Navbar = ({ refreshTrigger }) => {
  const [progress, setProgress] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);

  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await axios.get(
        "http://127.0.0.1:8000/api/progress/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = Array.isArray(res.data) ? res.data : [];

      const total = data.reduce((acc, i) => acc + i.total_hours, 0);
      const done = data.reduce((acc, i) => acc + i.completed_hours, 0);

      const percent = total > 0 ? (done / total) * 100 : 0;

      setProgress(Math.round(percent));

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, [refreshTrigger]);

  return (
    <div className="w-full sticky top-0 z-50">

      <div className="bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">

          {/* LEFT - BRAND */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm shadow">
              📘
            </div>

            <div>
              <h1 className="text-md sm:text-lg font-semibold text-gray-800">
                Planora
              </h1>
              <p className="text-[10px] text-gray-400 hidden sm:block">
                Smart Study Tracker
              </p>
            </div>
          </div>

          {/* RIGHT - DESKTOP */}
          <div className="hidden sm:flex items-center gap-3">

            {/* PROGRESS */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100">
              <div className="w-14 h-1.5 bg-purple-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-purple-600 font-medium">
                {progress}%
              </span>
            </div>

            <button className="px-4 py-1.5 text-xs rounded-full bg-purple-50 text-purple-600 border border-purple-200 hover:bg-purple-100 transition">
              + Plan
            </button>

            <button className="px-4 py-1.5 text-xs rounded-full bg-pink-50 text-pink-600 border border-pink-200 hover:bg-pink-100 transition">
              😊 Mood
            </button>

            <button className="px-4 py-1.5 text-xs rounded-full bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 transition">
              Logout
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="sm:hidden">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100"
            >
              ☰
            </button>
          </div>
        </div>

        {/* 💎 MOBILE DROPDOWN */}
        {openMenu && (
          <div className="sm:hidden px-4 pb-4">

            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-md border border-white/60 p-4 space-y-3">

              {/* PROGRESS */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Progress</span>
                <span className="text-xs text-purple-600 font-medium">
                  {progress}%
                </span>
              </div>

              <div className="w-full h-1.5 bg-purple-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* ACTIONS */}
              <button className="w-full text-left px-4 py-2 text-sm rounded-xl bg-purple-50 text-purple-600">
                + Add Plan
              </button>

              <button className="w-full text-left px-4 py-2 text-sm rounded-xl bg-pink-50 text-pink-600">
                😊 Add Mood
              </button>

              <button className="w-full text-left px-4 py-2 text-sm rounded-xl bg-gray-50 text-gray-600">
                Logout
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Navbar;