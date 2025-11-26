import { ApiRoutes } from "./constants";
import axiosInstance from "./instance";

export const connect = async (request: RoomRequest) => {
  const { data } = await axiosInstance.post(ApiRoutes.ROOM_CONNECT, request);
  return data;
};
