import React, { useState } from 'react';

const ManageUsers = () => {
  // Mock data including a "role" field
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
    { id: 2, name: "Sarah Smith", email: "sarah@example.com", role: "user" },
    { id: 3, name: "Mike Ross", email: "mike@example.com", role: "user" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", role: "user" },
  ]);

  const handleMakeAdmin = (id) => {
    alert(`User ${id} is now an Admin! (Backend logic goes here)`);
    // Logic to update state would go here
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500">Promote members or remove them from the mess.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-6 py-4 font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Email Address</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Current Role</th>
                <th className="px-6 py-4 font-semibold text-center text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      {/* Make Admin Button */}
                      <button 
                        onClick={() => handleMakeAdmin(user.id)}
                        disabled={user.role === 'admin'}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-all ${
                          user.role === 'admin' 
                          ? 'text-gray-400 border-gray-200 cursor-not-allowed' 
                          : 'text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white'
                        }`}
                      >
                        Make Admin
                      </button>

                      {/* Delete Button */}
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-rose-600 border border-rose-600 rounded-md hover:bg-rose-600 hover:text-white transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="p-10 text-center text-gray-400">
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;