import styles from "../styles/auth.module.scss";
import Link from "next/link";

export default function LoginLayout({
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
        <Link href="/register" className={styles.noDecoration}>
          <div className={styles.topic}>
            <p className={styles.authorization}>Регистрация</p>
            <div className={styles.keyContainer}>
              <img src="/key.svg" alt="key icon" className={styles.key} />
            </div>
          </div>
        </Link>
      </header>
      <main className={styles.main}>{children}</main>
    </>
  );
}
