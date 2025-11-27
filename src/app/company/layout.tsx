"use client";
import styles from "./company.module.scss";
import { getCompany } from "@/api/auth";
import { useEffect, useState } from "react";
import { logout } from "@/api/auth";
import { useRouter } from "next/navigation";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  async function userLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <>
      <div className={styles.layoutContainer}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <div className={styles.logoContainer}>
              <img src="/Logo.svg" alt="logo" className={styles.logo} />
            </div>
            <div className={styles.nameContainer}>
              <p className={styles.name}>Panopticum</p>
            </div>
          </div>
          <div className={styles.topic}>
            <p className={styles.companyName}>Компания</p>
            <div className={styles.divider}></div>
            <p className={styles.authorization}>Выйти из аккаунта</p>
            <div
              onClick={() => userLogout()}
              className={styles.logoutContainer}
            >
              <img
                src="/register.svg"
                alt="logout icon"
                className={styles.logout}
              />
            </div>
          </div>
        </header>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>
          <p className={styles.policyLink}>
            <a>Политика конфиденциальности</a>
          </p>
          <p className={styles.copyRight}>© TOPfiIT, 2025</p>
        </footer>
      </div>
    </>
  );
}
