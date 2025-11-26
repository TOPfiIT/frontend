import styles from "../styles/auth.module.scss";
import RegistrationForm from "./registration.form";
import Link from "next/link";

export default function Page() {
  return (
    <div className={styles.authWrapper}>
      <div className={styles.authBox}>
        <div className={styles.baseAuthText}>
          <h1 className={styles.authTitle}>Регистрация компании</h1>
      <p className={styles.authSuggestion}>
        Уже есть аккаунт?{" "}
        <Link className={styles.accountLink} href="/login">
          Войдите тут
          </Link>
          </p>
        </div>
      <RegistrationForm />
      </div>
    </div>
  );
}
