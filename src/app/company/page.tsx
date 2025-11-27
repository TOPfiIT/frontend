"use client";
import styles from "./company.module.scss";
import { getCompany } from "@/api/auth";
import { useEffect, useState } from "react";
import { createVacancy, getCompanyVacancies } from "@/api/vacancy";
import { useRouter } from "next/navigation";

export default function Page() {
  const [company, setCompany] = useState<CompanySession>({
    company_id: "",
    company_name: "",
  });
  const [vacancyForm, setVacancyForm] = useState<CreateVacancyRequest>({
    company_id: "test", // not needed?
    profession: "",
    position: "",
    requirements: [],
    tasks: [],
    task_ideas: [],
    metrics: [],
    is_active: true,
    duration: 0,
  });
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loadingVacancies, setLoadingVacancies] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createVacancy(vacancyForm);
      console.log(response);

      // Обновляем список вакансий после создания
      const updatedVacancies = await getCompanyVacancies();
      setVacancies(updatedVacancies);

      // Очищаем форму
      setVacancyForm({
        company_id: "test",
        profession: "",
        position: "",
        requirements: [],
        tasks: [],
        task_ideas: [],
        metrics: [],
        is_active: true,
        duration: 0,
      });
    } catch (error: any) {
      const msg = error.response?.data.error;
      console.error("Vacancy creation failed: ", msg);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVacancyForm((prev: CreateVacancyRequest) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVacancyForm((prev: CreateVacancyRequest) => ({
      ...prev,
      [name]: parseInt(value),
    }));
  };

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVacancyForm((prev: CreateVacancyRequest) => ({
      ...prev,
      [name]: value.split("\n"),
    }));
    console.log(vacancyForm);
  };

  useEffect(() => {
    async function fetchCompany() {
      try {
        const data = await getCompany();
        setCompany(data);
      } catch (error) {
        console.error("Failed to fetch company:", error);
      }
    }

    async function fetchVacancies() {
      try {
        const data = await getCompanyVacancies();
        setVacancies(data);
      } catch (error) {
        console.error("Failed to fetch vacancies:", error);
      } finally {
        setLoadingVacancies(false);
      }
    }

    fetchCompany();
    fetchVacancies();
  }, []);

  return (
    <div className={styles.companyPage}>
      {/* <h1 className={styles.companyTitle}>Личный кабинет</h1> */}
      <h2 className={styles.createTitle}>Создать вакансию:</h2>
      <div className={styles.createFormContainer}>
        <form onSubmit={handleSubmit} className={styles.createForm}>
          <div className={styles.inputsBlock}>
            <label className={styles.inputContainer}>
              <span className={styles.inputTitleContainer}>
                <p className={styles.inputTitle}>Профессия </p>
                <p className={styles.asterisk}>*</p>
              </span>
              <input
                type="text"
                name="profession"
                placeholder="Профессия на которую ведётся отбор..."
                autoComplete="off"
                onChange={handleChange}
                required
                className={styles.inputBox}
              />
            </label>
            <label className={styles.inputContainer}>
              <span className={styles.inputTitleContainer}>
                <p className={styles.inputTitle}>Длительность </p>
                <p className={styles.asterisk}>*</p>
              </span>
              <input
                type="number"
                name="duration"
                placeholder="Длительность собеседования (в минутах)..."
                autoComplete="off"
                onChange={handleChangeNum}
                required
                className={styles.inputBox}
              />
            </label>
            <label className={styles.inputContainer}>
              <span className={styles.inputTitleContainer}>
                <p className={styles.inputTitle}>Должность </p>
                <p className={styles.asterisk}>*</p>
              </span>
              <input
                type="text"
                name="position"
                placeholder="Должность на которую ведётся отбор..."
                autoComplete="off"
                onChange={handleChange}
                required
                className={styles.inputBox}
              />
            </label>
          </div>
          <div className={styles.areasBlock}>
            <label className={styles.areaContainer}>
              <span className={styles.inputTitleContainer}>
                <p className={styles.inputTitle}>Требования </p>
                <p className={styles.asterisk}>*</p>
              </span>
              <textarea
                autoComplete="off"
                name="requirements"
                placeholder="Опишите требования к участникам интервью..."
                onChange={handleChangeTextarea}
                required
                className={styles.areaBox}
              />
            </label>
            <label className={styles.areaContainer}>
              <span className={styles.inputTitleContainer}>
                <p className={styles.inputTitle}>Идеи заданий </p>
                <p className={styles.asterisk}>*</p>
              </span>
              <textarea
                autoComplete="off"
                name="task_ideas"
                placeholder="Идеи ваших заданий..."
                onChange={handleChangeTextarea}
                required
                className={styles.areaBox}
              />
            </label>
            <label className={styles.areaContainer}>
              <span className={styles.inputTitleContainer}>
                <p className={styles.inputTitle}>Ваши задания </p>
              </span>
              <textarea
                autoComplete="off"
                name="tasks"
                placeholder="Ваши собственные задания..."
                onChange={handleChangeTextarea}
                className={styles.areaBox}
              />
            </label>
          </div>
          <div className={styles.submitContainer}>
            <button className={styles.submit} type="submit">
              Создать
            </button>
          </div>
        </form>
      </div>
      <h2 className={styles.createTitle}>Список вакансий компании:</h2>
      {loadingVacancies && "Загрузка вакансий компании..."}
      {!loadingVacancies && (
        <div className={styles.vacancyList}>
          {vacancies.map((vacancy) => (
            <div key={vacancy.id} className={styles.vacancyCard}>
              <div className={styles.cardMain}>
                <div className={styles.professionContainer}>
                  <p className={styles.profession}>{vacancy.profession}</p>
                </div>
                <div className={styles.members}>
                  <p className={styles.membersCounter}>0</p>
                  <div className={styles.membersIconContainer}>
                    <img
                      className={styles.membersIcon}
                      src="/members.svg"
                      alt="members icon"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.cardSub}>
                <p className={styles.position}>{vacancy.position}</p>
              </div>
              <div className={styles.cardInfo}>
                <div className={styles.durationContainer}>
                  <p className={styles.duration}>
                    Длительность: {Math.floor(vacancy.duration / 60)}:
                    {(vacancy.duration % 60).toString().padStart(2, "0")}:00
                  </p>
                </div>
                <div>
                  <button
                    onClick={() =>
                      router.push(`/company/vacancy/${vacancy.id}`)
                    }
                    className={styles.moreButton}
                  >
                    <p className={styles.buttonText}>Подробнее</p>
                    <img
                      className={styles.arrowRight}
                      src="/arrow-right.svg"
                      alt="arrow right"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* <div className={styles.vacancyList}>
        <div className={styles.vacancyCard}>
          <div className={styles.cardMain}>
            <div className={styles.professionContainer}>
              <p className={styles.profession}>Full Stack Developer</p>
            </div>
            <div className={styles.members}>
              <p className={styles.membersCounter}>52</p>
              <div className={styles.membersIconContainer}>
                <img
                  className={styles.membersIcon}
                  src="/members.svg"
                  alt="members icon"
                />
              </div>
            </div>
          </div>
          <div className={styles.cardSub}>
            <p className={styles.position}>Senior</p>
          </div>
          <div className={styles.cardInfo}>
            <div className={styles.durationContainer}>
              <p className={styles.duration}>Длительность: 1:20:00</p>
            </div>
            <div>
              <button className={styles.moreButton}>
                <p className={styles.buttonText}>Подробнее</p>
                <img
                  className={styles.arrowRight}
                  src="/arrow-right.svg"
                  alt="arrow right"
                />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.vacancyCard}>
          <div className={styles.cardMain}>
            <div className={styles.professionContainer}>
              <p className={styles.profession}>Full Stack Developer</p>
            </div>
            <div className={styles.members}>
              <p className={styles.membersCounter}>52</p>
              <div className={styles.membersIconContainer}>
                <img
                  className={styles.membersIcon}
                  src="/members.svg"
                  alt="members icon"
                />
              </div>
            </div>
          </div>
          <div className={styles.cardSub}>
            <p className={styles.position}>Senior</p>
          </div>
          <div className={styles.cardInfo}>
            <div className={styles.durationContainer}>
              <p className={styles.duration}>Длительность: 1:20:00</p>
            </div>
            <div>
              <button className={styles.moreButton}>
                <p className={styles.buttonText}>Подробнее</p>
                <img
                  className={styles.arrowRight}
                  src="/arrow-right.svg"
                  alt="arrow right"
                />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.vacancyCard}>
          <div className={styles.cardMain}>
            <div className={styles.professionContainer}>
              <p className={styles.profession}>Full Stack Developer</p>
            </div>
            <div className={styles.members}>
              <p className={styles.membersCounter}>52</p>
              <div className={styles.membersIconContainer}>
                <img
                  className={styles.membersIcon}
                  src="/members.svg"
                  alt="members icon"
                />
              </div>
            </div>
          </div>
          <div className={styles.cardSub}>
            <p className={styles.position}>Senior</p>
          </div>
          <div className={styles.cardInfo}>
            <div className={styles.durationContainer}>
              <p className={styles.duration}>Длительность: 1:20:00</p>
            </div>
            <div>
              <button className={styles.moreButton}>
                <p className={styles.buttonText}>Подробнее</p>
                <img
                  className={styles.arrowRight}
                  src="/arrow-right.svg"
                  alt="arrow right"
                />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.vacancyCard}>
          <div className={styles.cardMain}>
            <div className={styles.professionContainer}>
              <p className={styles.profession}>Full Stack Developer</p>
            </div>
            <div className={styles.members}>
              <p className={styles.membersCounter}>52</p>
              <div className={styles.membersIconContainer}>
                <img
                  className={styles.membersIcon}
                  src="/members.svg"
                  alt="members icon"
                />
              </div>
            </div>
          </div>
          <div className={styles.cardSub}>
            <p className={styles.position}>Senior</p>
          </div>
          <div className={styles.cardInfo}>
            <div className={styles.durationContainer}>
              <p className={styles.duration}>Длительность: 1:20:00</p>
            </div>
            <div>
              <button className={styles.moreButton}>
                <p className={styles.buttonText}>Подробнее</p>
                <img
                  className={styles.arrowRight}
                  src="/arrow-right.svg"
                  alt="arrow right"
                />
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
