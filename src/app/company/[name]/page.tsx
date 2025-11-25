import styles from "./company.module.scss";
export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name: name } = await params;
  return (
    <div className={styles.companyPage}>
      <h1>Страница компании {name}</h1>
      <h2>Список вакансий: </h2>
      <p>Прораб...</p>
      <p>Парикмахер...</p>
    </div>
  );
}
