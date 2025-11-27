"use client";
import styles from "./company.module.scss";
import { getCompany } from "@/api/auth";
import { useEffect, useState } from "react";
export default function Page() {
  const [company, setCompany] = useState<CompanySession>({ company_id: "" });
  const [vacancyForm, setVacancyForm] = useState<CreateVacancyRequest>({
    company_id: company.company_id,
    profession: "",
    position: "",
    requirements: [],
    tasks: [],
    task_ideas: [],
    metrics: [],
    is_active: true,
    duration: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // const response = await login(formData);
      // console.log(response);
      // router.push("/company");
      // Редирект или сообщение об успехе
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

  useEffect(() => {
    async function fetchCompany() {
      const data = await getCompany();
      setCompany(data);
    }

    fetchCompany();
  });

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
                type="text"
                name=""
                placeholder="Длительность собеседования..."
                autoComplete="off"
                onChange={handleChange}
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
                name=""
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
                name=""
                placeholder="Опишите требования к участникам интервью..."
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
                name=""
                placeholder="Идеи ваших заданий..."
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
                name=""
                placeholder="Ваши собственные задания..."
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
      <div className={styles.vacancyList}>
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
      </div>
    </div>
  );
}
