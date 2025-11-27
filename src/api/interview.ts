import { ApiRoutes } from "./constants";
import axiosInstance from "./instance";

export const createRoom = async (request: CreateRoomRequest) => {
  const { data } = await axiosInstance.post(ApiRoutes.CREATE_ROOM, request);
  return data;
};

export const stopRoom = async () => {
  const { data } = await axiosInstance.delete(ApiRoutes.CREATE_ROOM);
  return data;
};

export const sendSolution = async () => {
  const { data } = await axiosInstance.post(ApiRoutes.SEND_SOLUTION);
  return data;
};

export const sendQuestion = async (question: string) => {
  const { data } = await axiosInstance.post(ApiRoutes.SEND_QUESTION, question);
  return data;
};
