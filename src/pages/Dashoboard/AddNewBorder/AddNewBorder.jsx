import React, { useState } from 'react';

const AddNewBorder = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roomNo: '',
    mealCharge: '',
    deposit: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Border Data:", formData);
    alert(`Member ${formData.name} added successfully!`);
    // Reset form after submission
    setFormData({ name: '', email: '', phone: '', roomNo: '', mealCharge: '', deposit: '' });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
        <div className="mb-8 border-b pb-4">
          <h2 className="text-3xl font-extrabold text-gray-800">Add New Border</h2>
          <p className="text-gray-500">Register a new member to the mess management system.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Tanvir Ahmed"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="017XXXXXXXX"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
              />
            </div>

            {/* Room Number Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Room Number</label>
              <input
                type="text"
                name="roomNo"
                value={formData.roomNo}
                onChange={handleChange}
                placeholder="e.g. 302-B"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
              />
            </div>

            {/* Meal Charge Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Initial Meal Charge</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-400">৳</span>
                <input
                  type="number"
                  name="mealCharge"
                  required
                  value={formData.mealCharge}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>
            </div>

            {/* Deposit Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Advance Deposit</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-400">৳</span>
                <input
                  type="number"
                  name="deposit"
                  required
                  value={formData.deposit}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 transition-all transform active:scale-[0.98]"
            >
              Add Member to System
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewBorder;