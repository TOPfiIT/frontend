"use client";

import { useState, useEffect, useRef } from "react";
import useSse from "@/hooks/useSse";
import styles from "./room.module.scss";
import CodeEditor from "./CodeEditor";
import LanguageSelector from "./LanguageSelector";
import { useClipboardMonitor } from "hooks/useClipboardMonitor";
import toast from "react-hot-toast";
import {
  sendSolution,
  sendQuestion,
  SendSolutionRequest,
  SendQuestionRequest,
} from "@/api/interview";

import { ApiRoutes } from "@/api/constants";

const API_BASE_URL = "http://localhost:80/interview/api/v1";
const SSE_ENDPOINTS = {
  WELCOME: `${API_BASE_URL}/room/welcome/sse`,
  SOLUTION_RESPONSE: `${API_BASE_URL}/room/solution/response/sse`,
  QUESTION_RESPONSE: `${API_BASE_URL}/room/question/response/sse`,
  TASK: `${API_BASE_URL}/room/task/sse`,
};

export default function Page() {
  const [currentLanguage, setCurrentLanguage] = useState("javascript");
  const [code, setCode] = useState("// Write your code here");
  const [question, setQuestion] = useState("");

  // Состояния для разных типов сообщений
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [solutionResponse, setSolutionResponse] = useState("");
  const [questionResponse, setQuestionResponse] = useState("");
  const [currentTask, setCurrentTask] = useState("");
  const [displayedTask, setDisplayedTask] = useState(""); // Для анимации печати задания

  // Активное отображаемое сообщение (для анимации печати)
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isTaskTyping, setIsTaskTyping] = useState(false);
  const [activeMessageType, setActiveMessageType] = useState<
    "welcome" | "solution" | "question" | "task"
  >("welcome");

  // SSE хуки для разных эндпоинтов
  const {
    message: welcomeMsg,
    isLoading: welcomeLoading,
    error: welcomeError,
    clearMessage: clearWelcome,
  } = useSse(SSE_ENDPOINTS.WELCOME, {
    onMessage: (data) => {
      if (data.type === "message_chunk") {
        setActiveMessageType("welcome");
      }
    },
  });

  const {
    message: solutionRespMsg,
    isLoading: solutionLoading,
    error: solutionError,
    clearMessage: clearSolution,
  } = useSse(SSE_ENDPOINTS.SOLUTION_RESPONSE, {
    onMessage: (data) => {
      if (data.type === "message_chunk") {
        setActiveMessageType("solution");
      }
    },
  });

  const {
    message: questionRespMsg,
    isLoading: questionLoading,
    error: questionError,
    clearMessage: clearQuestion,
  } = useSse(SSE_ENDPOINTS.QUESTION_RESPONSE, {
    onMessage: (data) => {
      if (data.type === "message_chunk") {
        setActiveMessageType("question");
      }
    },
  });

  const {
    message: taskMsg,
    isLoading: taskLoading,
    error: taskError,
    clearMessage: clearTask,
  } = useSse(SSE_ENDPOINTS.TASK, {
    onMessage: (data) => {
      if (data.type === "message_chunk") {
        setActiveMessageType("task");
        // Когда приходит новое задание, обновляем currentTask
        setCurrentTask((prev) => prev + data.content);
      }
    },
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const taskContainerRef = useRef<HTMLDivElement>(null);

  // Автоматически загружаем первое задание при монтировании
  useEffect(() => {
    // SSE TASK уже подключен и будет автоматически получать задания
    console.log("Компонент монтирован, ожидаем первое задание...");
  }, []);

  // Анимация печати для основного чата
  useEffect(() => {
    let activeFullMessage = "";

    switch (activeMessageType) {
      case "welcome":
        activeFullMessage = welcomeMsg;
        break;
      case "solution":
        activeFullMessage = solutionRespMsg;
        break;
      case "question":
        activeFullMessage = questionRespMsg;
        break;
      case "task":
        activeFullMessage = taskMsg;
        break;
    }

    // Логика анимации печати
    if (!activeFullMessage) {
      setDisplayedText("");
      return;
    }

    if (!activeFullMessage.startsWith(displayedText) || displayedText === "") {
      setDisplayedText("");
      setIsTyping(true);

      let currentIndex = 0;
      const typeInterval = setInterval(() => {
        if (currentIndex < activeFullMessage.length) {
          setDisplayedText((prev) => prev + activeFullMessage[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, 30);

      return () => clearInterval(typeInterval);
    }

    if (activeFullMessage.length > displayedText.length) {
      setIsTyping(true);

      const newText = activeFullMessage.slice(displayedText.length);
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
  }, [
    welcomeMsg,
    solutionRespMsg,
    questionRespMsg,
    taskMsg,
    activeMessageType,
    displayedText,
  ]);

  // Анимация печати для задания
  useEffect(() => {
    if (!currentTask) {
      setDisplayedTask("");
      return;
    }

    if (!currentTask.startsWith(displayedTask) || displayedTask === "") {
      setDisplayedTask("");
      setIsTaskTyping(true);

      let currentIndex = 0;
      const typeInterval = setInterval(() => {
        if (currentIndex < currentTask.length) {
          setDisplayedTask((prev) => prev + currentTask[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTaskTyping(false);
        }
      }, 30);

      return () => clearInterval(typeInterval);
    }

    if (currentTask.length > displayedTask.length) {
      setIsTaskTyping(true);

      const newText = currentTask.slice(displayedTask.length);
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex < newText.length) {
          setDisplayedTask((prev) => prev + newText[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTaskTyping(false);
        }
      }, 30);

      return () => clearInterval(typeInterval);
    }

    setIsTaskTyping(false);
  }, [currentTask, displayedTask]);

  // Прокрутка вниз при новом тексте
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [displayedText]);

  useEffect(() => {
    if (taskContainerRef.current) {
      taskContainerRef.current.scrollTop =
        taskContainerRef.current.scrollHeight;
    }
  }, [displayedTask]);

  // Обработка ошибок
  useEffect(() => {
    const error = welcomeError || solutionError || questionError || taskError;
    if (error) {
      toast.error(`Ошибка соединения: ${error}`);
    }
  }, [welcomeError, solutionError, questionError, taskError]);

  // Мониторинг буфера обмена
  const [copyPasteCount, setCopyPasteCount] = useState(0);
  const clipboardMonitor = useClipboardMonitor({
    minLengthToRecord: 2,
    onEvent(rec) {
      if (rec.type === "paste" && rec.source === "external") {
        toast.error(`Обнаружена внешняя вставка (${rec.length} символов)`);
        setCopyPasteCount((prev) => prev + 1);
      }
    },
  });

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  const skipAnimation = () => {
    let activeFullMessage = "";
    switch (activeMessageType) {
      case "welcome":
        activeFullMessage = welcomeMsg;
        break;
      case "solution":
        activeFullMessage = solutionRespMsg;
        break;
      case "question":
        activeFullMessage = questionRespMsg;
        break;
      case "task":
        activeFullMessage = taskMsg;
        break;
    }
    setDisplayedText(activeFullMessage);
    setIsTyping(false);
  };

  const skipTaskAnimation = () => {
    setDisplayedTask(currentTask);
    setIsTaskTyping(false);
  };

  // Основные функции
  async function handleNextTask() {
    try {
      // Очищаем предыдущие сообщения и задание
      clearSolution();
      clearQuestion();
      clearTask();
      setCurrentTask("");
      setDisplayedTask("");

      // Получаем метрики копипаста
      const metrics = clipboardMonitor.getMetrics();
      const totalExternalPastes = metrics.totals.externalPastes;

      // Отправляем текущее решение
      const solutionRequest: SendSolutionRequest = {
        solution: code,
        copy_paste_count: totalExternalPastes,
        language: currentLanguage,
        solution_type: "code",
      };

      console.log("Отправка решения и запрос нового задания...");
      await sendSolution(solutionRequest);
      toast.success("Решение отправлено, ожидаем новое задание...");

      // Сбрасываем счетчик копипаста
      setCopyPasteCount(0);

      // Сбрасываем код редактора для нового задания
      setCode("// Write your code here\n// Новое задание загружается...");

      // Новое задание автоматически придет через SSE TASK
      // Дождимся его в течение 10 секунд
      setTimeout(() => {
        if (!currentTask && !taskLoading) {
          toast.error("Новое задание не пришло. Попробуйте еще раз.");
        }
      }, 10000);
    } catch (error) {
      toast.error("Ошибка при отправке решения");
      console.error("Next task error:", error);
    }
  }

  async function handleSendQuestion(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;

    try {
      const questionRequest: SendQuestionRequest = {
        question: question.trim(),
      };

      await sendQuestion(questionRequest);
      setQuestion("");
      toast.success("Вопрос отправлен");
    } catch (error) {
      toast.error("Ошибка при отправке вопроса");
      console.error("Send question error:", error);
    }
  }

  const isLoading =
    welcomeLoading || solutionLoading || questionLoading || taskLoading;

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
        <div
          ref={taskContainerRef}
          className={styles.tasksList}
          onClick={isTaskTyping ? skipTaskAnimation : undefined}
        >
          <div
            className={`${styles.taskContent} ${
              isTaskTyping ? styles.typing : ""
            }`}
          >
            {!displayedTask && !taskLoading ? (
              <div className={styles.placeholder}>
                {taskError
                  ? "Ошибка загрузки задания"
                  : "Первое задание загружается..."}
              </div>
            ) : (
              <div className={styles.taskText}>
                {displayedTask}
                {isTaskTyping && <span className={styles.cursor}>|</span>}
              </div>
            )}
            {taskLoading && (
              <div className={styles.loading}>Загрузка задания...</div>
            )}
          </div>
        </div>
        <div className={styles.next}>
          <button
            onClick={handleNextTask}
            className={styles.nextButton}
            disabled={isLoading || !currentTask}
          >
            {isLoading ? "Отправка..." : "Следующее задание"}
          </button>
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
            <CodeEditor
              value={code}
              onChange={handleCodeChange}
              mode={currentLanguage}
              height="100%"
            />
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
          <div className={styles.resultBox}>
            <p className={styles.resultMessage}>
              {solutionRespMsg ||
                "Результаты появятся здесь после отправки решения"}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.chatSpace}>
        <div className={styles.chat}>
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

            {(welcomeError || solutionError || questionError || taskError) && (
              <div className={styles.error}>Ошибка соединения</div>
            )}
          </div>

          <form onSubmit={handleSendQuestion} className={styles.messageBar}>
            <textarea
              className={styles.inputArea}
              value={question}
              onChange={handleQuestionChange}
              placeholder="Задайте вопрос интервьюеру..."
              disabled={isLoading}
            />
            <button
              type="submit"
              className={styles.submitMessage}
              disabled={!question.trim() || isLoading}
            >
              <img src="/big-arrow-right.svg" alt="arrow right icon" />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
