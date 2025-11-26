import styles from "./privacy.module.scss";
import Link from "next/link";

export default function PrivacyPageLayout({
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
          <p className={styles.authorization}>Регистрация</p>
          <div className={styles.keyContainer}>
            <img src="/security.svg" alt="securicty icon" className={styles.key} />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
