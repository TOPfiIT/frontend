import styles from "styles/auth.module.scss"; // стили, как в авторизации
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: id } = await params;
  return (
    <div className={styles.companyPage}>
      <button>Назад</button>
      <h1>Приглашение на вакансию: {id}</h1>
    </div>
  );
}
