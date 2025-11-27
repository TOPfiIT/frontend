"use client";

import { useState, useEffect, useRef } from "react";
import useSse from "@/hooks/useSse";
import styles from "./room.module.scss";
import CodeEditor from "./CodeEditor";
import LanguageSelector from "./LanguageSelector";
import { useClipboardMonitor } from "hooks/useClipboardMonitor";
import toast from "react-hot-toast";

const API_BASE_URL = "http://localhost:80/interview/api/v1";
const SSE_ENDPOINTS = {
  WELCOME: `${API_BASE_URL}/room/welcome/sse`,
};

export default function Page() {
  const [currentLanguage, setCurrentLanguage] = useState("javascript");
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const {
    message: fullMessage,
    isLoading,
    error,
  } = useSse(SSE_ENDPOINTS.WELCOME);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Улучшенный эффект для "печатания" текста
  useEffect(() => {
    if (!fullMessage) {
      setDisplayedText("");
      return;
    }

    // Если текст полностью изменился - начинаем заново
    if (!fullMessage.startsWith(displayedText) || displayedText === "") {
      setDisplayedText("");
      setIsTyping(true);

      let currentIndex = 0;
      const typeInterval = setInterval(() => {
        if (currentIndex < fullMessage.length) {
          setDisplayedText((prev) => prev + fullMessage[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, 30); // Скорость печатания

      return () => clearInterval(typeInterval);
    }

    // Если просто добавился текст - допечатываем только новую часть
    if (fullMessage.length > displayedText.length) {
      setIsTyping(true);

      const newText = fullMessage.slice(displayedText.length);
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex < newText.length) {
          setDisplayedText((prev) => prev + newText[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, 30);

      return () => clearInterval(typeInterval);
    }

    setIsTyping(false);
  }, [fullMessage, displayedText]);

  // Прокрутка вниз при новом тексте
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [displayedText]);

  // Настройка toast
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).toast = toast;
    }
  }, []);

  // Обработка ошибок
  useEffect(() => {
    if (error) {
      toast.error(`Ошибка соединения: ${error}`);
    }
  }, [error]);

  // Мониторинг буфера обмена
  const monitor = useClipboardMonitor({
    minLengthToRecord: 2,
    onEvent(rec) {
      if (rec.type === "paste" && rec.source === "external") {
        toast.error(`Обнаружена внешняя вставка (${rec.length} символов)`);
      }
    },
  });

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
  };

  // Функция для принудительного завершения "печатания"
  const skipAnimation = () => {
    setDisplayedText(fullMessage);
    setIsTyping(false);
  };

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

          {/* Область чата */}
          <div
            ref={chatContainerRef}
            className={`${styles.chatContent} ${isTyping ? styles.typing : ""}`}
            onClick={isTyping ? skipAnimation : undefined}
          >
            {!displayedText && !isLoading ? (
              <div className={styles.placeholder}>
                Интервьюер появится здесь...
              </div>
            ) : (
              <div className={styles.message}>
                {displayedText}
                {isTyping && <span className={styles.cursor}>|</span>}
              </div>
            )}

            {error && <div className={styles.error}>Ошибка: {error}</div>}
          </div>
        </div>
        <textarea />
      </div>
    </main>
  );
}
