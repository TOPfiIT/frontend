import { ApiRoutes } from "./constants";
import axiosInstance from "./instance";

export const getUsers = async (ids: number[]) => {
  const params = new URLSearchParams();
  ids.map((id) => params.append("ids", String(id)));

  const { data } = await axiosInstance.get(ApiRoutes.GET_USERS, {
    params: params,
  });

  return data;
};

export const getUser = async (id: number) => {
  const { data } = await axiosInstance.get(
    ApiRoutes.GET_USER.replace(":id", String(id))
  );

  return data;
};

// export const updateUser = async (request: UpdateUserRequest) => {
//   const { data } = await axiosInstance.patch(ApiRoutes.UPDATE_USER, request);

//   return data;
// };

// export const deleteUser = async (id: number) => {
//   await axiosInstance.delete(ApiRoutes.DELETE_USER, {
//     params: {
//       id: id,
//     },
//   });
// };
