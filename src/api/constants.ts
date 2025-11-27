export enum ApiRoutes {
  // AUTH
  LOGIN = "/auth/login",
  REGISTER = "/auth/register",
  REFRESH_TOKEN = "/auth/refresh",
  LOGOUT = "/auth/logout",

  // COMPANY
  GET_COMPANY = "/auth/company", // ЗАПРОС ЛЕЗЕТ В COOKIE!

  // VACANCIES
  CREATE_VACANCY = "/vacancy/vacancies",
  GET_VACANCIES = "/vacancy/vacancies/company", // BY COOKIE TOKEN
  // GET_VACANCY_BY_ID = "/vacancy/vacancies/:vacancy_id",
  GET_INTERVIEW_RESULTS_BY_VACANCY_ID = "/vacancy/vacancies/:vacancy_id/interview",

  // INTERVIEW
  CREATE_ROOM = "/interview/api/v1/room",
  DELETE_ROOM = "/interview/api/v1/room",
  GET_ROOM_WELCOME_SSE = "/interview/api/v1/room/welcome/sse",
  SEND_SOLUTION = "/interview/api/v1/room/solution",
  SEND_QUESTION = "/interview/api/v1/room/question",
}
