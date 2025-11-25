import styles from "./room.module.scss";
import Logo from "../../../public/Logo.svg";

// TOKEN
export default async function Page() {
  return (

    <main className={styles.main}>
      <div className={styles.taskSpace}>
        <div className={styles.actionBar}>
          <div className={styles.barNameWrapper}>
            <div className={styles.barLogoContainer}>
              <img src="/document.svg" alt="document icon" />
            </div>
            <div className={styles.barNameContainer}>
              <p className={styles.barName}>Задания</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.codeSpace}>
        <div className={styles.code}>
          <div className={styles.actionBar}>
            <div className={styles.barNameWrapper}>
              <div className={styles.barLogoContainer}>
                <img src="/code.svg" alt="code icon" />
              </div>
              <div className={styles.barNameContainer}>
                <p className={styles.barName}>Код</p>
              </div>
            </div>
            <div className={styles.taskNameContainer}>
              <p className={styles.taskName}>Номер и название задания</p>
            </div>
          </div>
        </div>
        <div className={styles.result}>
          <div className={styles.actionBar}>
            <div className={styles.barNameWrapper}>
              <div className={styles.barLogoContainer}>
                <img src="/terminal.svg" alt="terminal icon" />
              </div>
              <div className={styles.barNameContainer}>
                <p className={styles.barName}>Результаты тестов</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.chatSpace}>
        <div className={styles.code}>
          <div className={styles.actionBar}>
            <div className={styles.barNameWrapper}>
              <div className={styles.barLogoContainer}>
                <img src="/ai.svg" alt="ai icon" />
              </div>
              <div className={styles.barNameContainer}>
                <p className={styles.barName}>Интервьюер</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

  );
}
