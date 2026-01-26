import { useContext, useEffect, useState } from "react";
import useAllBorder from "../../../components/Hooks/useAllBorder";
import useAxiosSecure from "../../../components/Hooks/useAxiosSecure";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAllUsers from "../../../components/Hooks/useAllUsers";

const MealCalculation = () => {
  // Current Date for the input (defaults to today)
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const axiosSecure = useAxiosSecure();

  const { borders: initialBorders } = useAllBorder();
  const [borders, setBorders] = useState([]);

  const { user } = useContext(AuthContext); //get login user
  const { allUsers } = useAllUsers(); // all users from database
  // find login user in database by
  const searchUser = allUsers.find((u) => u?.email === user?.email);
  const results = borders.filter((b) => b?.messName.toLowerCase() === searchUser?.messName.toLowerCase()); // borders show by mess name
  // console.log(result);

  const messName = searchUser?.messName;

  const messBorders = borders.filter((b) => b?.messName.toLowerCase() === messName.toLowerCase());

  useEffect(() => {
    if (initialBorders?.length) {
      setBorders(
        initialBorders.map((b) => ({
          ...b,
          mealCount: b.mealCount || 0,
          todayMeal: 0,
        })),
      );
    }
  }, [initialBorders]);

  // Handle increment and decrement
  const updateMealCount = (memberId, delta) => {
    setBorders((prev) =>
      prev.map((member) =>
        member._id === memberId
          ? {
              ...member,
              mealCount: Math.max(0, member.mealCount + delta),
              todayMeal:
                delta > 0
                  ? member.todayMeal + delta
                  : Math.max(0, member.todayMeal + delta),
            }
          : member,
      ),
    );
  };

  const handleSubmit = async () => {
    const payload = {
      date: selectedDate,
      borders: messBorders.map((member) => ({
        borderId: member._id,
        email: member.email,
        mealCount: member.mealCount || 0,
      })),
    };

    try {
      const res = await axiosSecure.patch("/borders/meals", payload);

      if (res.data.modifiedCount > 0) {
        alert("Meal counts updated successfully!");
      }

      // monthly meals
      const monthlyPayload = {
        month: new Date(selectedDate).toLocaleString("default", {
          month: "long",
          year: "numeric",
        }),
        borders: messBorders.map((member) => ({
          date: selectedDate,
          name: member.name,
          email: member.email,
          meal: member.todayMeal || 0,
          messName: member.messName,
        })),
      };

      await axiosSecure.post("/monthly-meals", monthlyPayload);

      // reset only this mess users
      setBorders((prev) =>
        prev.map((b) => (b.messName === messName ? { ...b, todayMeal: 0 } : b)),
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update meal counts");
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {searchUser?.messName} Daily Meal Entry
            </h1>
            <p className="text-slate-500 text-sm">
              Update how many meals each member had today.
            </p>
          </div>

          <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
            <label className="text-xs font-bold text-slate-400 uppercase px-2">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="block w-full px-2 py-1 text-slate-700 outline-none"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-600 text-sm uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold">Member</th>
                <th className="px-6 py-4 text-center font-semibold">
                  Meal Count
                </th>
                <th className="px-6 py-4 text-right font-semibold">Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {results.map((member) => (
                <tr
                  key={member._id}
                  className="hover:bg-slate-50/50 transition"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-800">
                      {member.name}
                    </div>
                    <div className="text-xs text-slate-400">{member.email}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-block w-10 h-10 leading-10 rounded-full font-bold text-lg ${
                        member.mealCount > 0
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {member.mealCount || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        onClick={() => updateMealCount(member._id, -1)}
                        className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-300 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
                      >
                        -
                      </button>
                      <button
                        onClick={() => updateMealCount(member._id, 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-300 text-slate-600 hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition"
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Submit Action */}
          <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-8 rounded-lg shadow-lg shadow-indigo-200 transition-all active:scale-95"
            >
              Submit Daily Meals
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCalculation;
