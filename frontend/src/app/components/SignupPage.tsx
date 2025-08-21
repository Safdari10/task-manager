"use client";

import { useRouter } from "next/navigation";
import { signup } from "../hooks/useSignUp";
import { SignUpProps } from "../types/loginSignup";

const SignupPage = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  error,
  setError,
}: SignUpProps) => {
  const router = useRouter();

  const handleSignup = async () => {
    const response = await signup({ firstName, lastName, email, password, setError });
    if (response) {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white w-full h-full p-14 shadow-md text-center">
      <h1 className="text-3xl font-bold text-blue-600">Sign Up</h1>
      <p className="mt-4 text-lg text-gray-700">Please fill in the details to create an account.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}>
        <div className="flex flex-col items-center mt-4">
          <label htmlFor="first_name" className="mt-4 w-64 text-sm font-medium text-gray-600">
            FIRST NAME
            <input
              type="text"
              id="first_name"
              name="first_name"
              required
              className="block mt-2 w-full p-1 border-b-1 border-b-gray-400"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label htmlFor="last_name" className="mt-4 w-64 text-sm font-medium text-gray-600">
            LAST NAME
            <input
              type="text"
              id="last_name"
              name="last_name"
              required
              className="block mt-2 w-full p-1 border-b-1 border-b-gray-400"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label htmlFor="email" className="mt-4 w-64 text-sm font-medium text-gray-600">
            EMAIL
            <input
              type="email"
              id="email"
              name="email"
              required
              className="block mt-2 w-full p-1 border-b-1 border-b-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password" className="mt-4 w-64 text-sm font-medium text-gray-600">
            PASSWORD
            <input
              type="password"
              id="password"
              name="password"
              required
              className="block mt-2 w-full p-1 border-b-1 border-b-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label htmlFor="confirm_password" className="mt-4 w-64 text-sm font-medium text-gray-600">
            CONFIRM PASSWORD
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              required
              className="block mt-2 w-full p-1 border-b-1 border-b-gray-400"
            />
          </label>
        </div>
        <button
          type="submit"
          className="mt-8 w-64 p-2 bg-blue-600 text-lg font-medium text-white rounded-3xl hover:bg-blue-700">
          Sign Up
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default SignupPage;
