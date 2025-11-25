"use client";

import { useState } from "react";
import styles from "styles/auth.module.scss";
import { register } from "@/api/auth";
import Link from "next/link";
import { AxiosError } from "axios";

interface ApiErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
  details?: any;
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<AuthRequest>({
    name: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      console.log(response);
      // Редирект или сообщение об успехе
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
    setFormData((prev: AuthRequest) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="name">
        <span>Название компании</span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Введите название компании..."
          autoComplete="off"
          required
        />
      </label>

      <label htmlFor="password">
        <span>Пароль</span>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Введите пароль..."
          autoComplete="new-password"
          required
        />
      </label>

      <label htmlFor="privacy">
        <input type="checkbox" name="privacy" required />
        <span>
          Я принимаю условия{" "}
          <Link className={styles.privacyLink} href="privacy">
            <u>политики конфиденциальности</u>
          </Link>
        </span>
      </label>

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
