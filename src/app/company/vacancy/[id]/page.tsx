import styles from "../../company.module.scss";
import { IntervieweeCard } from "./IntervieweeCard";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: id } = await params;

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
      recommendation: "казнить"
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
      recommendation: "нанять"
    }
  ];

  return (
    <div className={styles.vacancyPage}>
      <div className={styles.vacancyInfo}>
        <div className={styles.infoMain}>
          <h1 className={styles.vacancyTitle}>Укротитель питонов</h1>
          <div className={styles.vacancyTime}>
            <div className={styles.timeContainer}>
              <img className={styles.timeIcon} src="/timer.svg" alt="timer icon" />
            </div>
            <p className={styles.vacancyTime}>1:20:00</p>
          </div>
          <div className={styles.vacancyMembers}>
            <div className={styles.membersContainer}>
              <img className={styles.membersIcon} src="/members.svg" alt="members icon" />
            </div>
            <p className={styles.vacancyMembers}>52</p>
          </div>
        </div>
        <div className={styles.positionContainer}>
          <p className={styles.position}>Senior</p>
        </div>
        <div className={styles.vacancyParameters}>
          <div className={styles.parameter}>
            <p className={styles.parameterTitle}>Требования</p>
            <div className={styles.parameterContent}>
              <p className={styles.contentText}>Должен мощно ловить питонов голыми руками, без варежек, без перчаток, без оборудования. + программировать на листочке на всех языках программирования, иметь личную машину Тьюринга в подвале своего личного котеджа в Крыму, говорить по китайски. В паспорте в графе имя должно стоять DeepSeek.</p>
            </div>
          </div>
          <div className={styles.parameter}>
            <p className={styles.parameterTitle}>Идеи задания</p>
            <div className={styles.parameterContent}>
              <p className={styles.contentText}>Первое задание - час двадцать бегать по кругу, громко и выразительно шипеть внушая ужас во всех близлежащих питонов, чтобы они знали, кто тут главный.
  Задание два - жонглировать питонами на протяжениями 10 минут. Минимальное количество снарядов - 10^e, за каждого последующего питона давать респект дикий.
  На посошок - разработать маленький сервис на FastAPI с 4 бд, нейронкой, фронтом тоже на питоне. Никакого html. На всё минут 10.</p>
            </div>
          </div>
          <div className={styles.parameter_long}>
            <p className={styles.parameterTitle}>Ваши задания</p>
            <div className={styles.parameterContent}>
              <p className={styles.contentText}>Я хочу пицыы...</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className={styles.vacancyBlockTitle}>Результаты участников:</h2>
      <div className={styles.vacancyResults}>
        {interviewees.map((interviewee) => (
          <IntervieweeCard
            key={interviewee.id}
            interviewee={interviewee}
          />
        ))}
      </div>
    </div>
  );
}