import { ApiRoutes } from "./constants";
import axiosInstance from "./instance";

export const login = async (request: AuthRequest) => {
  const { data } = await axiosInstance.post(ApiRoutes.LOGIN, request);
  return data;
};

export const logout = async () => {
  await axiosInstance.delete(ApiRoutes.LOGOUT);
};

export const register = async (request: AuthRequest) => {
  const { data } = await axiosInstance.post(ApiRoutes.REGISTER, request);
  return data;
};

// Session - NEEDS access_token from COOKIE
export const getCompany = async () => {
  // .get<GetCompanyResponse>
  const { data } = await axiosInstance.get(ApiRoutes.GET_COMPANY);
  console.log(data);

  return data;
};

export const refreshToken = async () => {
  await axiosInstance.head(ApiRoutes.REFRESH_TOKEN);
};
