import styles from "../styles/auth.module.scss";
import Link from "next/link";
import LoginForm from "./login.form";

export default function Page() {
  return (
    <div className={styles.authWrapper}>
      <div className={styles.authBox}>
        <div className={styles.baseAuthText}>
          <h1 className={styles.authTitle}>Вход в аккаунт компании</h1>
          <p className={styles.authSuggestion}>
            Нет аккаунта?{" "}
            <Link className={styles.accountLink} href="/register">
              Зарегистрируйтесь тут
            </Link>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
