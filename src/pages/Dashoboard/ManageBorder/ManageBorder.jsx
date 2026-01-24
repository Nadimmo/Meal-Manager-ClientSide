import React, { useState } from 'react';
import useAllBorder from '../../../components/Hooks/useAllBorder';

const ManageBorder = () => {
  
  const {borders} = useAllBorder()



  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      setUsers(borders.filter(user => user.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Borders Management</h1>
          
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-6 py-4 font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Email Address</th>
                <th className="px-6 py-4 font-semibold text-center text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {borders.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      {/* Update Button */}
                      <button 
                        disabled={user.role === 'admin'}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-all 
                           text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white
                        `}
                      >
                        Update
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
          {borders.length === 0 && (
            <div className="p-10 text-center text-gray-400">
              No borders found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBorder;