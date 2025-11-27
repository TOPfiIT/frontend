import { ApiRoutes } from "./constants";
import axiosInstance from "./instance";

export const createVacancy = async (request: CreateVacancyRequest) => {
  const { data } = await axiosInstance.post(ApiRoutes.CREATE_VACANCY, request);
  console.log(data);
  return data;
};

// By token
export const getCompanyVacancies = async () => {
  const { data } = await axiosInstance.get(ApiRoutes.GET_VACANCIES);

  return data;
};

export const getVacancy = async (vacancy_id: string): Promise<Vacancy> => {
  const { data } = await axiosInstance.get<Vacancy>(
    ApiRoutes.GET_VACANCY_BY_ID.replace(":vacancy_id", vacancy_id)
  );

  return data;
};

export const getInterviewResults = async (vacancy_id: string) => {
  const { data } = await axiosInstance.get(
    ApiRoutes.GET_INTERVIEW_RESULTS_BY_VACANCY_ID.replace(
      ":vacancy_id",
      vacancy_id
    )
  );

  return data;
};
