"use client";

import { useState } from "react";
import styles from "app/(auth)/styles/auth.module.scss";
import { createRoom } from "@/api/interview";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RoomForm({ vacancy_id }: { vacancy_id: string }) {
  const [roomLoading, setRoomLoading] = useState(false);
  const [formData, setFormData] = useState<CreateRoomRequest>({
    vacancy_id: vacancy_id,
    name: "",
    surname: "",
    resume_link: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRoomLoading(true);
    try {
      const response = await createRoom(formData);
      console.log(response);
      router.push("/room");
      setRoomLoading(false);
      // Редирект или сообщение об успехе
    } catch (error: any) {
      const msg = error.response?.data.error;
      console.error("Connection failed: ", msg);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: CreateRoomRequest) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputsContainers}>
        <label className={styles.inputContainer} htmlFor="name">
          <span className={styles.inputTitle}>Имя</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Введите ваше имя..."
            autoComplete="off"
            required
            className={styles.inputBox}
          />
        </label>

        <label className={styles.inputContainer} htmlFor="surname">
          <span className={styles.inputTitle}>Фамилия</span>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Введите вашу фамилию..."
            autoComplete="off"
            required
            className={styles.inputBox}
          />
        </label>

        <label className={styles.inputContainer} htmlFor="resume_link">
          <span className={styles.inputTitle}>Ссылка на резюме</span>
          <input
            type="text"
            name="resume_link"
            value={formData.resume_link}
            onChange={handleChange}
            placeholder="Прикрепите ссылку..."
            autoComplete="off"
            required
            className={styles.inputBox}
          />
        </label>

        <label className={styles.checkboxContainer} htmlFor="privacy">
          <input
            className={styles.policyInput}
            id="privacy"
            type="checkbox"
            name="privacy"
            required
          />
          <span className={styles.customCheckbox}></span>
          <span className={styles.policyTitle}>
            Я принимаю условия{" "}
            <Link className={styles.privacyLink} href="privacy">
              <u>политики конфиденциальности</u>
            </Link>
          </span>
        </label>
      </div>
      {!roomLoading && (
        <button className={styles.submit} type="submit">
          Начать собеседование
        </button>
      )}
      {roomLoading && (
        <button className={styles.submit} disabled>
          Ожидайте...
        </button>
      )}
    </form>
  );
}
