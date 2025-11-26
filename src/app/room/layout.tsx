"use client";
import "./editor.css";
import styles from "./room.module.scss";
import { styled } from "styled-components";
import { Toaster } from "react-hot-toast";

const ProgressBarStatus = styled.div`
  width: calc(100% / 3 * 2);
`;

export default function RoomLayout({
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
        <div className={styles.status}>
          <div className={styles.statusTime}>
            <div className={styles.timerContainer}>
              <img src="/timer.svg" alt="timer" className={styles.timer} />
            </div>
            <div className={styles.timeContainer}>
              <p className={styles.time}>Осталось: 20:07</p>
            </div>
          </div>
          <div className={styles.statusProgressBar}>
            <div className={styles.progressBar}>
              <div className={styles.progress}>
                <ProgressBarStatus
                  className={styles.progressLine}
                ></ProgressBarStatus>
              </div>
            </div>
            <div className={styles.progressCount}>
              <p className={styles.counter}>2/3</p>
            </div>
          </div>
        </div>
        <div className={styles.topic}>
          <p className={styles.topicName}>Тема собеседования</p>
          <p className={styles.topicLevel}>Сложность</p>
          <p className={styles.companyName}>Компания</p>
          <div className={styles.bookContainer}>
            <img src="/book.svg" alt="book icon" className={styles.book} />
          </div>
        </div>
      </header>
      <main>
        {children}
        <Toaster position="bottom-right" />
      </main>
    </>
  );
}
