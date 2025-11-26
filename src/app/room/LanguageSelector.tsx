"use client";

import { useState } from "react";
import styles from "./room.module.scss";

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
];

interface LanguageSelectorProps {
  onLanguageChange: (language: string) => void;
  currentLanguage: string;
}

export default function LanguageSelector({
  onLanguageChange,
  currentLanguage,
}: LanguageSelectorProps) {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const handleLanguageChange = (language: string) => {
    onLanguageChange(language);
    setIsLanguageOpen(false);
  };

  return (
    <div className={styles.dropdownWrapper}>
      <button
        className={styles.dropdownButton}
        onClick={() => setIsLanguageOpen(!isLanguageOpen)}
      >
        {languages.find((lang) => lang.value === currentLanguage)?.label ||
          "JavaScript"}
        <span className={styles.arrow}>▼</span>
      </button>

      {isLanguageOpen && (
        <div className={styles.dropdownMenu}>
          {languages.map((language) => (
            <div
              key={language.value}
              className={styles.dropdownItem}
              onClick={() => handleLanguageChange(language.value)}
            >
              {language.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
