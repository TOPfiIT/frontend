// import { ApiRoutes } from "./constants";
// import axiosInstance from "./instance";

// export const getSession = async () => {
//   const response = await axiosInstance.get(ApiRoutes.GET_CHAT_STREAM, {
//     responseType: "stream",
//   });

//   // Read the stream response
//   let data = "";
//   response.data.on("data", (chunk: any) => {
//     data += chunk;
//   });

//   response.data.on("end", () => {
//     // Process the complete data
//     console.log("Stream data:", data);
//   });

//   //   return data;
// };
