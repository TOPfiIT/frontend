interface CreateVacancyRequest {
  company_id: string;
  profession: string;
  position: string;
  requirements: string[];
  tasks: string[];
  task_ideas: string[];
  metrics: string[];
  is_active: boolean;
  duration: number;
}
