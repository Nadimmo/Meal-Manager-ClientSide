import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const useMonthlyMeals = () => {
  const axiosPublic = useAxiosPublic();
  const { data: monthlyMeals, refetch } = useQuery({
    queryKey: ["monthlyMeals"],
    queryFn: async () => {
      const response = await axiosPublic.get("/borders/monthly-meals");
      return response.data;
    },
  });

  return { monthlyMeals, refetch };
};

export default useMonthlyMeals;
