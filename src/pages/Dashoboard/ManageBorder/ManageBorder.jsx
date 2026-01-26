import React, { useContext, useState } from "react";
import useAllBorder from "../../../components/Hooks/useAllBorder";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../components/Hooks/useAxiosSecure";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAllUsers from "../../../components/Hooks/useAllUsers";

const ManageBorder = () => {
  const { borders, refetch } = useAllBorder();
  const axiosSecure = useAxiosSecure();

    const { user } = useContext(AuthContext); //get login user
    const { allUsers } = useAllUsers(); // all users from database
    // find login user in database by
    const searchUser = allUsers.find((u) => u?.email === user?.email);
    const results = borders.filter(b => b?.messName === searchUser?.messName) // borders show by mess name
    // console.log(result);

  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    deposit: "",
    mealCharge: "",
  });

  // -------- DELETE --------
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This border will be removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/borders/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Border removed successfully.", "success");
            refetch();
          }
        });
      }
    });
  };

  // -------- OPEN MODAL --------
  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      deposit: user.deposit || "",
      mealCharge: user.mealCharge || "",
    });
    document.getElementById("update_modal").checked = true;
  };

  // -------- UPDATE --------
  const handleUpdate = async () => {
    try {
      const res = await axiosSecure.put(
        `/borders/${selectedUser._id}`,
        formData
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Border updated successfully.", "success");
        document.getElementById("update_modal").checked = false;
        setSelectedUser(null);
        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update border", "error");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Borders Management {searchUser?.messName}</h1>

        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Mess Name</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {results.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.messName}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => openUpdateModal(user)}
                        className="px-3 py-1.5 text-xs font-semibold text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-3 py-1.5 text-xs font-semibold text-rose-600 border border-rose-600 rounded hover:bg-rose-600 hover:text-white"
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
            <p className="p-10 text-center text-gray-400">No borders found</p>
          )}
        </div>
      </div>

      {/* ---------- UPDATE MODAL ---------- */}
      <input type="checkbox" id="update_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Update Border</h3>

          <input
            className="input input-bordered w-full mb-3"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <input
            className="input input-bordered w-full mb-3"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            className="input input-bordered w-full mb-3"
            placeholder="Deposit"
            value={formData.deposit}
            onChange={(e) =>
              setFormData({ ...formData, deposit: e.target.value })
            }
          />

          <input
            className="input input-bordered w-full"
            placeholder="Meal Charge"
            value={formData.mealCharge}
            onChange={(e) =>
              setFormData({ ...formData, mealCharge: e.target.value })
            }
          />

          <div className="modal-action">
            <button onClick={handleUpdate} className="btn btn-primary">
              Save
            </button>
            <label htmlFor="update_modal" className="btn">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBorder;
