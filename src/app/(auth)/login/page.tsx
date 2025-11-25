import styles from "styles/auth.module.scss";
import Link from "next/link";
import LoginForm from "./login.form";

export default function Page() {
  return (
    <div className={styles.authBox}>
      <h2>Вход в аккаунт компании</h2>
      <p>
        Нет аккаунта?{" "}
        <Link className={styles.accountLink} href="/register">
          Зарегистрируйтесь тут
        </Link>
      </p>
      <LoginForm />
    </div>
  );
}
