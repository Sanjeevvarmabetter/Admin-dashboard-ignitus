import React from "react";

const AdminHeader = () => {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-full px-6 py-4 flex items-center justify-between">
        <h1 className="text-xs font-semibold tracking-wide">
          Ignitus Networks | NEAR Crowdfunding Admin
        </h1>

        <button
          className="px-4 py-1.5 text-xs font-medium bg-red-600 hover:bg-red-700 rounded-md transition"
          onClick={() => {
            // TODO: implement logout
            console.log("Logout clicked");
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
