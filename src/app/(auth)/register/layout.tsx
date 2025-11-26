import styles from "../styles/auth.module.scss";
export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
            <p className={styles.authorization}>Вход</p>
            <div className={styles.keyContainer}>
              <img src="/key.svg" alt="key icon" className={styles.key} />
            </div>
          </div>
        </header>
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
