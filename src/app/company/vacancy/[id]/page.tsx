import styles from "../company.module.scss";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: id } = await params;
  return (
    <div className={styles.companyPage}>
      <button>Назад</button>
      <h1>Страница вакансии {id}</h1>
    </div>
  );
}
