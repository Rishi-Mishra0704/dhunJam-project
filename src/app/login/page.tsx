"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "./api"; // adjust the path as needed

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const handleLogin = async () => {
    try {
      const response = await adminLogin(username, password);
      console.log(response);
      router.push('/dashboard', { scroll: false })
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>Venue Admin Login</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Sign In</button>
    </div>
  );
};

export default Login;
