"use client";

import { useState } from "react";
import styles from "../styles/auth.module.scss";
import { register } from "@/api/auth";
import Link from "next/link";

export default function RegistrationForm() {
  // Явно указываем, что значения не могут быть undefined
  const [formData, setFormData] = useState<AuthRequest>({
    name: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      console.log(response);
    } catch (error: any) {
      const msg = error.response?.data.error;
      const existsMsg = "[AuthService] company already exists";
      if (msg == existsMsg)
        console.log("Registration failed: company already exists");
      else console.error("Registration failed: ", msg);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputsContainers}>
        <label className={styles.inputContainer} htmlFor="name">
          <span className={styles.inputTitle}>Название компании</span>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name || ""} // Гарантируем, что не будет undefined
            onChange={handleChange}
            placeholder="Введите название компании..."
            autoComplete="off"
            required
            className={styles.inputBox}
          />
        </label>

        <label className={styles.inputContainer} htmlFor="password">
          <span className={styles.inputTitle}>Пароль</span>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password || ""} // Гарантируем, что не будет undefined
            onChange={handleChange}
            placeholder="Введите пароль..."
            autoComplete="new-password"
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

      <button className={styles.submit} type="submit">
        Зарегистрироваться
      </button>
    </form>
  );
}
