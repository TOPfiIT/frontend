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

interface Vacancy {
  id: string;
  company_id: string;
  profession: string;
  position: string;
  requirements: string[];
  tasks: string[];
  task_ideas: string[];
  metrics: string[];
  is_active: boolean;
  duration: number;
  created_at: string;
}

interface InterviewResults {
  id: string;
  vacancy_id: string;
  name: string;
  surname: string;
  resume_link: string;
  tasks: string[];
  solutions: string[];
  chat_history: string[];
  metrics: string[];
}
