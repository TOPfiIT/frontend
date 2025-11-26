import styles from "app/(auth)/styles/auth.module.scss";

export default function RoomConnectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.logoContainer}>
            <img src="/Logo.svg" alt="logo" className={styles.logo} />
          </div>
          <div className={styles.nameContainer}>
            <p className={styles.name}>Panopticum</p>
          </div>
        </div>
        <div className={styles.topic}>
          <p className={styles.authorization}>Подключение к интервью</p>
          <div className={styles.keyContainer}>
            <img src="/key.svg" alt="key icon" className={styles.key} />
          </div>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </>
  );
}
