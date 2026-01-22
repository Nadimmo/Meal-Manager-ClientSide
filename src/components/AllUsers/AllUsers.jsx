import React from 'react';

const AllUsers = () => {
  // Updated mock data with Deposit and Bill
  const members = [
    { id: 1, name: "John Doe", email: "john@example.com", meals: 45, deposit: 2000, bill: 2000 },
    { id: 2, name: "Sarah Smith", email: "sarah@example.com", meals: 38, deposit: 1500, bill: 1200 },
    { id: 3, name: "Mike Ross", email: "mike@example.com", meals: 12, deposit: 500, bill: 2000 },
    { id: 4, name: "Emily Davis", email: "emily@example.com", meals: 50, deposit: 2500, bill: 2200 },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-800">Mess Manager Dashboard</h1>
          <p className="text-slate-500">Manage member deposits, bills, and monthly dues.</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-slate-800 text-white uppercase text-xs tracking-wider">
                <th className="py-4 px-6 text-left">Member</th>
                <th className="py-4 px-6 text-center">Meals</th>
                <th className="py-4 px-6 text-center">Total Deposit</th>
                <th className="py-4 px-6 text-center">Total Bill</th>
                <th className="py-4 px-6 text-center">Due / Balance</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 text-sm">
              {members.map((member) => {
                // Calculation Logic
                const balance = member.deposit - member.bill;
                const isDue = balance < 0;
                const isCleared = balance === 0;

                return (
                  <tr key={member.id} className="border-b border-slate-100 hover:bg-blue-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900">{member.name}</div>
                      <div className="text-xs text-slate-400">{member.email}</div>
                    </td>
                    <td className="py-4 px-6 text-center font-medium">
                      {member.meals}
                    </td>
                    <td className="py-4 px-6 text-center text-blue-600 font-bold">
                      ৳{member.deposit}
                    </td>
                    <td className="py-4 px-6 text-center text-orange-600 font-bold">
                      ৳{member.bill}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {isCleared ? (
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                          CLEARED
                        </span>
                      ) : isDue ? (
                        <div className="flex flex-col items-center">
                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                            DUE
                          </span>
                          <span className="text-red-600 font-bold mt-1">৳{Math.abs(balance)}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                            BALANCE
                          </span>
                          <span className="text-green-600 font-bold mt-1">৳{balance}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;