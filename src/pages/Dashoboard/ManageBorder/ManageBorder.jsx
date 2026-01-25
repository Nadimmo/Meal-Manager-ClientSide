import React, { useState } from "react";
import useAllBorder from "../../../components/Hooks/useAllBorder";
import useAxiosPublic from "../../../components/Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ManageBorder = () => {
  const { borders, refetch } = useAllBorder();
  const axiosPublic = useAxiosPublic();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be remove this border!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/borders/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((error) => {
            console.error("Error deleting border:", error);
          });
      }
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Borders Management
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-6 py-4 font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Email Address
                </th>
                <th className="px-6 py-4 font-semibold text-center text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {borders.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      {/* Update Button */}
                      <button
                        disabled={user.role === "admin"}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-all 
                           text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white
                        `}
                      >
                        Update
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(user._id)}
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
