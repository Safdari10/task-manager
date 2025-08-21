"use client";

import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import LoginSignupToggle from "./components/LoginSignupToggle";

const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [display, setDisplay] = useState("login");

  return (
    <div className="flex items-center justify-center w-full max-h-screen py-96">
      <div className="w-[1024px] h-[700px] flex items-center justify-center shadow-lg rounded-2xl">
        {display === "login" ? (
          <LoginPage
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
            setError={setError}
          />
        ) : (
          <SignupPage
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
            setError={setError}
          />
        )}
        <LoginSignupToggle display={display} setDisplay={setDisplay} />
      </div>
    </div>
  );
};

export default Home;
