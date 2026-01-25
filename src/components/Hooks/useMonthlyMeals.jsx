import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
const useMonthlyMeals = () => {
  const axiosSecure = useAxiosSecure();
  const { data: monthlyMeals, refetch } = useQuery({
    queryKey: ["monthlyMeals"],
    queryFn: async () => {
      const response = await axiosSecure.get("/monthly-meals");
      return response.data;
    },
  });

  return { monthlyMeals, refetch };
};

export default useMonthlyMeals;
