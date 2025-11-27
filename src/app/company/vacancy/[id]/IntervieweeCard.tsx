"use client";

import { useState } from 'react';
import styles from "../../company.module.scss";

interface Interviewee {
  id: number;
  name: string;
  resumeLink: string;
  timeSpent: string;
  taskTimes: string;
  tasksCompleted: number;
  suspiciousCopies: number;
  codeQuality: string;
  understanding: string;
  level: string;
  recommendation: string;
}

interface IntervieweeCardProps {
  interviewee: Interviewee;
}

export function IntervieweeCard({ interviewee }: IntervieweeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${styles.intervieweeCard} ${isExpanded ? styles.expanded : ''}`}>
      {/* Верхняя часть - всегда видимая */}
      <div className={styles.cardHeader} onClick={toggleExpand}>
        <div className={styles.intervieweeInfo}>
          <p className={styles.intervieweeName}>{interviewee.name}</p>
          <p className={styles.intervieweeResume}>
            Резюме: <a className={styles.intervieweeResumeLink} href={interviewee.resumeLink}>{interviewee.resumeLink}</a>
          </p>
        </div>
        <div className={styles.intervieweeStatContainer}>
          <div className={styles.intervieweeLogoContainer}>
            <img className={styles.intervieweeLogo} src="/timer.svg" alt="timer icon" />
          </div>
          <p className={styles.intervieweeStat}><b>Потрачено:</b> {interviewee.timeSpent}</p>
          <div className={styles.intervieweeSplit}></div>
          <p className={styles.intervieweeStat}><b>На задания потрачено соответственно:</b> {interviewee.taskTimes}</p>
          <div className={styles.intervieweeSplit}></div>
          <p className={styles.intervieweeStat}><b>Заданий выполнено:</b> {interviewee.tasksCompleted}</p>
          <div className={styles.intervieweeSplit}></div>
          <p className={styles.intervieweeStat}><b>Количество подозрительных копирований:</b> {interviewee.suspiciousCopies}</p>
        </div>
        <div className={styles.intervieweeDivider}></div>

        {/* Сводка от ИИ - тоже всегда видима */}
        <div className={styles.intervieweeResume}>
          <h3 className={styles.intervieweeTitle}>Сводка от ИИ:</h3>
          <p className={styles.intervieweeText}>
            Lorem ipsum dolor sit amet consectetur. Iaculis netus ullamcorper nulla neque placerat malesuada pellentesque. Eu aliquam nullam lorem egestas. Proin etiam elementum condimentum convallis viverra. Ut volutpat sed nam non enim lectus. Mi ut eu lorem consequat viverra orci. Justo ullamcorper nibh erat molestie eget sollicitudin faucibus tincidunt urna.
          </p>
        </div>
      </div>

      {/* Размытая часть с призывом к действию */}
      {!isExpanded && (
        <div className={styles.expandOverlay} onClick={toggleExpand}>
          <div className={styles.expandContent}>
            <div className={styles.expandIcon}>↓</div>
            <p className={styles.expandText}>Развернуть полную информацию</p>
          </div>
        </div>
      )}

      {/* Детальная информация - показывается только при раскрытии */}
      {isExpanded && (
        <div className={styles.cardDetails}>
          <div className={styles.intervieweeNumbers}>
            <div className={styles.intervieweeLogoContainer}>
              <img className={styles.intervieweeLogo} src="/stat.svg" alt="statistic logo" />
            </div>
            <p className={styles.intervieweeStat}><b>Оценка чистоты кода:</b> {interviewee.codeQuality}</p>
            <div className={styles.intervieweeSplit}></div>
            <p className={styles.intervieweeStat}><b>Оценка понимания:</b> {interviewee.understanding}</p>
          </div>

          <div className={styles.intervieweeAssessment}>
            <h3 className={styles.intervieweeTitle}>Оценка результата:</h3>
            <p className={styles.intervieweeText}>
              Lorem ipsum dolor sit amet consectetur. Iaculis netus ullamcorper nulla neque placerat malesuada pellentesque. Eu aliquam nullam lorem egestas. Proin etiam elementum condimentum convallis viverra. Ut volutpat sed nam non enim lectus. Mi ut eu lorem consequat viverra orci. Justo ullamcorper nibh erat molestie eget sollicitudin faucibus tincidunt urna.
            </p>
          </div>

          <div className={styles.intervieweeLevel}>
            <div className={styles.intervieweeTitleContainer}>
              <div className={styles.intervieweeLogoContainer}>
                <img className={styles.intervieweeLogo} src="/assess.svg" alt="assessment icon" />
              </div>
              <h3 className={styles.intervieweeTitle}>Технический уровень: {interviewee.level}</h3>
            </div>
            <p className={styles.intervieweeText}>
              Lorem ipsum dolor sit amet consectetur. Iaculis netus ullamcorper nulla neque placerat malesuada pellentesque. Eu aliquam nullam lorem egestas. Proin etiam elementum condimentum convallis viverra. Ut volutpat sed nam non enim lectus. Mi ut eu lorem consequat viverra orci. Justo ullamcorper nibh erat molestie eget sollicitudin faucibus tincidunt urna.
            </p>
          </div>

          <div className={styles.intervieweeDivider}></div>

          <div className={styles.intervieweeStrengths}>
            <div className={styles.intervieweeTitleContainer}>
              <div className={styles.intervieweeLogoContainer}>
                <img className={styles.intervieweeLogo} src="/strength.svg" alt="strength icon" />
              </div>
              <h3 className={styles.intervieweeTitle}>Сильные стороны</h3>
            </div>
            <p className={styles.intervieweeText}>
              Lorem ipsum dolor sit amet consectetur. Iaculis netus ullamcorper nulla neque placerat malesuada pellentesque. Eu aliquam nullam lorem egestas. Proin etiam elementum condimentum convallis viverra. Ut volutpat sed nam non enim lectus. Mi ut eu lorem consequat viverra orci. Justo ullamcorper nibh erat molestie eget sollicitudin faucibus tincidunt urna.
            </p>
          </div>

          <div className={styles.intervieweeWeaknesses}>
            <div className={styles.intervieweeTitleContainer}>
              <div className={styles.intervieweeLogoContainer}>
                <img className={styles.intervieweeLogo} src="/weakness.svg" alt="weakness icon" />
              </div>
              <h3 className={styles.intervieweeTitle}>Слабые стороны</h3>
            </div>
            <p className={styles.intervieweeText}>
              Lorem ipsum dolor sit amet consectetur. Iaculis netus ullamcorper nulla neque placerat malesuada pellentesque. Eu aliquam nullam lorem egestas. Proin etiam elementum condimentum convallis viverra. Ut volutpat sed nam non enim lectus. Mi ut eu lorem consequat viverra orci. Justo ullamcorper nibh erat molestie eget sollicitudin faucibus tincidunt urna.
            </p>
          </div>

          <div className={styles.intervieweeCheats}>
            <div className={styles.intervieweeTitleContainer}>
              <div className={styles.intervieweeLogoContainer}>
                <img className={styles.intervieweeLogo} src="/cheat.svg" alt="cheat icon" />
              </div>
              <h3 className={styles.intervieweeTitle}>Оценка читерства:</h3>
            </div>
            <p className={styles.intervieweeText}>
              Lorem ipsum dolor sit amet consectetur. Iaculis netus ullamcorper nulla neque placerat malesuada pellentesque. Eu aliquam nullam lorem egestas. Proin etiam elementum condimentum convallis viverra. Ut volutpat sed nam non enim lectus. Mi ut eu lorem consequat viverra orci. Justo ullamcorper nibh erat molestie eget sollicitudin faucibus tincidunt urna.
            </p>
          </div>

          <div className={styles.intervieweeVerdict}>
            <div className={styles.intervieweeLogoContainer}>
              <img className={styles.intervieweeLogo} src="/idea.svg" alt="idea icon" />
            </div>
            <div className={styles.intervieweeStatResult}>
              <b>Итоговая оценка уровня: </b>
              <p className={styles.activeMarking}>{interviewee.level}</p>
            </div>
            <div className={styles.intervieweeSplit}></div>
            <div className={styles.intervieweeStatResult}>
              <b>Рекомендация: </b>
              <p className={styles.activeMarking}>{interviewee.recommendation}</p>
            </div>
          </div>

          <button className={styles.collapseButton} onClick={toggleExpand}>
            Свернуть ↑
          </button>
        </div>
      )}
    </div>
  );
}