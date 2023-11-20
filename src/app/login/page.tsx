"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "./api";
import styles from "./login.module.css";
import Link from "next/link";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const handleLogin = async () => {
    try {
      const response = await adminLogin(username, password);
      console.log(response);
      router.push("/dashboard", { scroll: false });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Venue Admin Login</h1>
      <div>
        <label htmlFor="username"></label>
        <input
          className={styles.input}
          type="text"
          id="username"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password"></label>
        <input
          className={styles.input}
          type="password"
          id="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className={styles.signin} onClick={handleLogin}>
        Sign In
      </button>
      <Link href="/" className={styles["new-link"]}>
        New Registration?
      </Link>
    </div>
  );
};

export default Login;
