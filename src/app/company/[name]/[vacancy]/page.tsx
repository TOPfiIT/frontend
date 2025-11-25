import styles from "../company.module.scss";
export default async function Page({
  params,
}: {
  params: Promise<{ vacancy: string }>;
}) {
  const { vacancy: vacancy } = await params;
  return (
    <div className={styles.companyPage}>
      <button>Назад</button>
      <h1>Страница вакансии {vacancy}</h1>
    </div>
  );
}
