import { ApiRoutes } from "./constants";
import axiosInstance from "./instance";

export interface SendSolutionRequest {
  solution: string;
  copy_paste_count: number;
  language: string;
  solution_type: string;
}

export interface SendQuestionRequest {
  question: string;
}

export const createRoom = async (request: CreateRoomRequest) => {
  const { data } = await axiosInstance.post(ApiRoutes.CREATE_ROOM, request);
  return data;
};

export const stopRoom = async () => {
  const { data } = await axiosInstance.delete(ApiRoutes.DELETE_ROOM);
  return data;
};

export const sendSolution = async (request: SendSolutionRequest) => {
  const { data } = await axiosInstance.post(ApiRoutes.SEND_SOLUTION, request);
  return data;
};

export const sendQuestion = async (request: SendQuestionRequest) => {
  const { data } = await axiosInstance.post(ApiRoutes.SEND_QUESTION, request);
  return data;
};
