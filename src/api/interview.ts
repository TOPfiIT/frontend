import { ApiRoutes } from "./constants";
import axiosInstance from "./instance";
import useSse from "hooks/useSse";

export const createRoom = async (request: CreateRoomRequest) => {
  const { data } = await axiosInstance.post(ApiRoutes.CREATE_ROOM, request);
  return data;
};

export const stopRoom = async () => {
  const { data } = await axiosInstance.delete(ApiRoutes.CREATE_ROOM);
  return data;
};
