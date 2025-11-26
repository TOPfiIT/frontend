"use client";

import { useState } from "react";
import styles from "./room.module.scss";
import CodeEditor from "./CodeEditor";
import LanguageSelector from "./LanguageSelector";
import { useClipboardMonitor } from "hooks/useClipboardMonitor";
import toast from "react-hot-toast";

export default function Page() {
  const [currentLanguage, setCurrentLanguage] = useState("javascript");

  const monitor = useClipboardMonitor({
    minLengthToRecord: 2,

    onEvent(rec) {
      // if (rec.type === "copy") {
      //   toast.success(`Скопировано: "${rec.snippet}"`);
      // }

      if (rec.type === "paste") {
        if (rec.source === "external") {
          toast.error(`Внешняя вставка (${rec.length} символов)`);
        } // else if (rec.source === "internal") {
        //   toast(`Вставлен скопированный текст`);
        // } else {
        //   toast(`Вставлено`);
        // }
      }
    },
  });

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
  };

  // ОТПРАВИТЬ МЕТРИКИ
  async function finishInterview() {
    const metrics = monitor.getMetrics();
    const resp = await monitor.sendMetrics("/api/submit-metrics");
    if (!resp.ok) {
      console.error("Metrics send failed", resp.error);
    } else {
      console.log("Metrics sent");
    }
    console.log("METRICS JSON", metrics);
  }

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
              <LanguageSelector
                onLanguageChange={handleLanguageChange}
                currentLanguage={currentLanguage}
              />
            </div>
          </div>

          <div className={styles.editorWrapper}>
            <CodeEditor mode={currentLanguage} height="100%" />
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
