import styles from "../../company.module.scss";
import { IntervieweeCard } from "./IntervieweeCard";
// import { useState, useEffect } from "react";
import { getVacancy } from "@/api/vacancy";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: id } = await params;
  // const vacancy = await getVacancy(id);
  const vacancy = {
    id: "",
    company_id: "",
    profession: "",
    position: "",
    requirements: [],
    tasks: [],
    task_ideas: [],
    metrics: [],
    is_active: true,
    duration: 0,
    created_at: "",
  };
  // const [vacancy, setVacancy] = useState<Vacancy>();
  // const [interviwees, setInterviwees] = useState([]);

  // useEffect(() => {
  //   async function fetchVacancy() {
  //     const data = getVacancy(id);
  //     setVacancy(data);
  //   }

  //   fetchVacancy();
  // }, []);

  const interviewees = [
    {
      id: 1,
      name: "Алексей Иванов",
      resumeLink: "https://drive.google.com/resume/alexey_ivanov.pdf",
      timeSpent: "1:19:54",
      taskTimes: "0:00:01, 1:09:53, 0:10:00",
      tasksCompleted: 3,
      suspiciousCopies: 3,
      codeQuality: "4/5",
      understanding: "3/5",
      level: "middle",
      recommendation: "казнить",
    },
    {
      id: 2,
      name: "Петр Сидоров",
      resumeLink: "https://drive.google.com/resume/petr_sidorov.pdf",
      timeSpent: "1:15:30",
      taskTimes: "0:05:00, 1:00:30, 0:10:00",
      tasksCompleted: 3,
      suspiciousCopies: 1,
      codeQuality: "5/5",
      understanding: "4/5",
      level: "senior",
      recommendation: "нанять",
    },
  ];

  return (
    <div className={styles.vacancyPage}>
      <div className={styles.vacancyInfo}>
        <div className={styles.infoMain}>
          <h1 className={styles.vacancyTitle}>{vacancy.profession}</h1>
          <div className={styles.vacancyTime}>
            <div className={styles.timeContainer}>
              <img
                className={styles.timeIcon}
                src="/timer.svg"
                alt="timer icon"
              />
            </div>
            <p className={styles.vacancyTime}>
              {Math.floor(vacancy.duration / 60)}:
              {(vacancy.duration % 60).toString().padStart(2, "0")}:00
            </p>
          </div>
          <div className={styles.vacancyMembers}>
            <div className={styles.membersContainer}>
              <img
                className={styles.membersIcon}
                src="/members.svg"
                alt="members icon"
              />
            </div>
            <p className={styles.vacancyMembers}>
              {/* Замените на актуальные данные о количестве участников */}
              {interviewees.length}
            </p>
          </div>
        </div>
        <div className={styles.positionContainer}>
          <p className={styles.position}>{vacancy.position}</p>
        </div>
        <div className={styles.vacancyParameters}>
          <div className={styles.parameter}>
            <p className={styles.parameterTitle}>Требования</p>
            <div className={styles.parameterContent}>
              <p className={styles.contentText}>
                {vacancy.requirements?.join(", ") || "Требования не указаны"}
              </p>
            </div>
          </div>
          <div className={styles.parameter}>
            <p className={styles.parameterTitle}>Идеи задания</p>
            <div className={styles.parameterContent}>
              <p className={styles.contentText}>
                {vacancy.task_ideas?.join(" ") || "Идеи заданий не указаны"}
              </p>
            </div>
          </div>
          <div className={styles.parameter_long}>
            <p className={styles.parameterTitle}>Ваши задания</p>
            <div className={styles.parameterContent}>
              <p className={styles.contentText}>
                {vacancy.tasks?.join(" ") || "Задания не назначены"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 className={styles.vacancyBlockTitle}>Результаты участников:</h2>
      <div className={styles.vacancyResults}>
        {interviewees.map((interviewee) => (
          <IntervieweeCard key={interviewee.id} interviewee={interviewee} />
        ))}
      </div>
    </div>
  );
}
