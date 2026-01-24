import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useAllBorder = () => {
  const axiosPublic = useAxiosPublic();
  const { data: borders = [], refetch } = useQuery({
    queryKey: ["borders"],
    queryFn: async () => {
      const res = await axiosPublic.get("/borders");
      return res.data;
    },
  });

  return { borders , refetch};
};

export default useAllBorder;
