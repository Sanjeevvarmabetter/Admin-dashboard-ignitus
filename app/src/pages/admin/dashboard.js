import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://admin-tools-backend.vercel.app/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleStatusChange = async (uid, disabled) => {
    try {
      await axios.patch(`https://admin-tools-backend.vercel.app/api/users/${uid}/status`, { disabled });
      const updatedUsers = users.map(user =>
        user.uid === uid ? { ...user, disabled } : user
      );
      setUsers(updatedUsers);
    } catch (err) {
      console.error("Error updating user status:", err);
    }
  };

  const handleAddUser = async () => {
    if (!name || !email || !phone || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await axios.post("https://admin-tools-backend.vercel.app/api/users", {
        name,
        email,
        phone,
        password,
      });
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setError("");
      fetchUsers();
      setShowAddUserForm(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add user. Please try again.");
      console.error("Error adding user:", err);
    } finally {
      setLoading(false);
    }
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">User Management</h1>
            <p className="mt-1 text-sm text-gray-400">
              Manage all registered users and their permissions
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search users..."
              className="block w-full sm:w-64 pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={() => setShowAddUserForm(!showAddUserForm)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
            >
              {showAddUserForm ? "Cancel" : "Add User"}
            </button>
          </div>
        </div>

        {showAddUserForm && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-4">Add New User</h2>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 rounded bg-gray-700 text-white border border-gray-600"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 rounded bg-gray-700 text-white border border-gray-600"
              />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-2 rounded bg-gray-700 text-white border border-gray-600"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>
            <button
              onClick={handleAddUser}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add User"}
            </button>
          </div>
        )}

        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow border border-gray-700">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => requestSort("email")}>
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => requestSort("createdAt")}>
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => requestSort("lastSignIn")}>
                  Last Sign-in
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Providers</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700 text-white">
              {filteredUsers.map((user) => (
                <tr key={user.uid}>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.createdAt}</td>
                  <td className="px-6 py-4">{user.lastSignIn}</td>
                  <td className="px-6 py-4">{user.providers.join(", ")}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleStatusChange(user.uid, !user.disabled)}
                      className={`px-3 py-1 rounded ${
                        user.disabled ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {user.disabled ? "Disabled" : "Enabled"}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
