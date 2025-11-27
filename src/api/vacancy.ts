import { ApiRoutes } from "./constants";
import axiosInstance from "./instance";

export const createVacancy = async (request: CreateVacancyRequest) => {
  const { data } = await axiosInstance.post(ApiRoutes.CREATE_VACANCY, request);
  return data;
};

// export const getVacancy = async (id: string) => {
//   const { data } = await axiosInstance.get(
//     ApiRoutes.GET_VACANCY_BY_ID.replace(":vacancy_id", id)
//   );

//   return data;
// };

export const getCompanyVacancies = async (company_id: string) => {
  const { data } = await axiosInstance.get(
    ApiRoutes.GET_VACANCIES_BY_COMPANY_ID.replace(":company_id", company_id)
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
