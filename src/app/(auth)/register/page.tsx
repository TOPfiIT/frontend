import styles from "styles/auth.module.scss";
import RegistrationForm from "./registration.form";
import Link from "next/link";

export default function Page() {
  return (
    <div className={styles.authBox}>
      <h2>Регистрация компании</h2>
      <p>
        Уже есть аккаунт?{" "}
        <Link className={styles.accountLink} href="/login">
          Войдите тут
        </Link>
      </p>
      <RegistrationForm />
    </div>
  );
}
