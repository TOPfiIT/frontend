"use client";

import { useState } from "react";
import styles from "styles/auth.module.scss";
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
    } catch (error: any) {
      const msg = error.response?.data.error;
      const notExistMsg = "[AuthService] company not found";
      const incorrectPasswordMsg = "[AuthService] invalid password";
      if (msg == notExistMsg) console.log("Login failed: company not found");
      else if (msg == incorrectPasswordMsg)
        console.log("Login failed: invalid password");
      else console.error("Login failed: ", msg);
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
      <label htmlFor="name">
        <span>Название компании</span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Введите название компании..."
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
          required
        />
      </label>
      <button type="submit">Войти</button>
    </form>
  );
}
