"use client";

import { useRouter } from "next/navigation";
import { login } from "../hooks/useLogin";
import { LoginProps } from "../types/loginSignup";
import { setToken } from "../utils/tokenStorage";
import { decodeToken, isTokenExpired } from "../utils/jwt";

const LoginPage = ({ email, setEmail, password, setPassword, error, setError }: LoginProps) => {
  const router = useRouter();

  const handleLogin = async () => {
    const response = await login({ email, password, setError });
    if (response.token) {
      const decoded = decodeToken(response.token);
      if (decoded && !isTokenExpired(decoded)) {
        setToken(response.token);
        router.push("/task_manager");
      } else {
        setError("Invalid or expired token ");
      }
    } else {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center bg-[#c9def0] w-full h-full p-14 shadow-md rounded-l-2xl text-center">
      <h1 className="text-3xl font-bold text-blue-600">Sign In</h1>
      <p className="mt-4 text-lg text-gray-600">Please enter your credentials</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}>
        <div className="flex flex-col items-center justify-between mt-8">
          <label htmlFor="email" className="w-64 text-sm font-medium text-gray-600">
            EMAIL ADDRESS
            <input
              type="email"
              className="block mt-2 w-full p-1 border-b-1 border-b-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password" className="w-64 mt-8 text-sm font-medium text-gray-600">
            PASSWORD
            <input
              type="password"
              className="block mt-2 w-full p-1 border-b-1 border-b-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button
          type="submit"
          className="mt-8 w-64 p-2 bg-blue-600 text-lg font-medium text-white rounded-3xl hover:bg-blue-700">
          SIGN IN
        </button>
      </form>
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </main>
  );
};

export default LoginPage;
