import styles from "app/(auth)/styles/auth.module.scss";
import RoomForm from "./room.form";
import "./roomOverride.module.scss";


export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className={styles.authWrapper}>
      <div className={styles.authBox}>
        <div className={styles.baseAuthText}>
          <h1 className={styles.authTitle}>Подключение к собеседованию</h1>
          <p className={styles.authSuggestion}>
            Заполните данную форму, чтобы начать прохождение AI cобеседования от
            компании {id}
          </p>
        </div>
        <RoomForm vacancy_id={id} />
      </div>
    </div>
  );
}
