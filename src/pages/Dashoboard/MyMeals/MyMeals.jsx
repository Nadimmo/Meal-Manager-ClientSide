import React, { useContext, useState } from "react";
import useMonthlyMeals from "../../../components/Hooks/useMonthlyMeals";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const MyMeals = () => {
  const { monthlyMeals } = useMonthlyMeals();
  const [search, setSearch] = useState("");
  const {user} = useContext(AuthContext)

  // flatten borders & apply search filter
  const filteredMeals = monthlyMeals
    ?.flatMap((month) => month.borders || [])
    .filter(
      (border) =>
        border.email?.toLowerCase() === user?.email?.toLowerCase()
    );

  const highlightText = (text, search) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} className="bg-yellow-200 text-black px-1 rounded">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Monthly Meals 🍽️
      </h2>

      {/* Search Bar */}
      <div className="mb-5 flex justify-end">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 border">#</th>
              <th className="px-4 py-3 border">Name</th>
              <th className="px-4 py-3 border">Email</th>
              <th className="px-4 py-3 border">Date</th>
              <th className="px-4 py-3 border">Meal</th>
            </tr>
          </thead>

          <tbody>
            {filteredMeals?.length > 0 ? (
              filteredMeals.map((border, index) => (
                <tr key={border._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border text-center">{index + 1}</td>

                  <td className="px-4 py-2 border font-medium">
                    {highlightText(border.name, search)}
                  </td>

                  <td className="px-4 py-2 border text-sm text-gray-600">
                    {highlightText(border.email, search)}
                  </td>

                  <td className="px-4 py-2 border">{border.date}</td>
                  <td className="px-4 py-2 border text-center font-semibold">
                    {highlightText(border.meal)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No matching results 😕
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyMeals;
