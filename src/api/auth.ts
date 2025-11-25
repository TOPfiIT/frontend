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

export const getSession = async () => {
  const { data } = await axiosInstance.get<GetUserResponse>(
    ApiRoutes.GET_SESSION
  );

  return data;
};

export const refreshToken = async () => {
  await axiosInstance.head(ApiRoutes.REFRESH_TOKEN);
};

// export const verifyEmail = async (request: VerifyEmailRequest) => {
//   await axiosInstance.post(ApiRoutes.VERIFY_EMAIL, request);
// };

// export const sendVerificationEmail = async (
//   request: SendVerificationEmailRequest
// ) => {
//   await axiosInstance.post(ApiRoutes.SEND_VERIFICATION_EMAIL, request);
// };

// export const changePassword = async (request: ChangePasswordRequest) => {
//   await axiosInstance.patch(ApiRoutes.CHANGE_PASSWORD, request);
// };

// export const sendResetPasswordEmail = async (
//   request: SendResetPasswordEmailRequest
// ) => {
//   await axiosInstance.post(ApiRoutes.SEND_RESET_PASSWORD_EMAIL, request);
// };
