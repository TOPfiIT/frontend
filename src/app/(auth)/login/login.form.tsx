"use client";

import { useState } from "react";
import styles from "../styles/auth.module.scss";
import { login } from "@/api/auth";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      console.log(response);
      // Редирект или сообщение об успехе
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: AuthRequest) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputsContainers}>
        <label className={styles.inputContainer} htmlFor="name">
          <span className={styles.inputTitle}>Название компании</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Введите название компании..."
            required
            className={styles.inputBox}
          />
        </label>

        <label className={styles.inputContainer} htmlFor="password">
          <span className={styles.inputTitle}>Пароль</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Введите пароль..."
            required
            className={styles.inputBox}
          />
        </label>
      </div>
      <button className={styles.submit} type="submit">Войти</button>
    </form>
  );
}
