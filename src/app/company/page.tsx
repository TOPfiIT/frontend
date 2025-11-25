import styles from "./company.module.scss";
export default async function Page() {
  // TOKEN
  return (
    <div className={styles.companyPage}>
      <h1>Страница компании TOKEN</h1>
      <h2>Список вакансий: </h2>
      <p>Прораб...</p>
      <p>Парикмахер...</p>
    </div>
  );
}
