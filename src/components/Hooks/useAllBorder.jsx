import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllBorder = () => {
  const axiosSecure = useAxiosSecure()
  const { data: borders = [], refetch } = useQuery({
    queryKey: ["borders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/borders");
      return res.data;
    },
  });

  return { borders , refetch};
};

export default useAllBorder;
