"use client";

import { login } from "../hooks/useLogin";

interface LoginProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string;
  setError: (error: string) => void;
}

const LoginPage = ({ email, setEmail, password, setPassword, error, setError }: LoginProps) => {
  const handleLogin = async () => {
    const response = await login({ email, password, setError });
    if (response) {
      // Handle successful login here (e.g., redirect to task_manager)
    }
  };

  return (
    <main className="flex flex-col items-center justify-center bg-[#c9def0] w-full h-[100vh] p-16 rounded-2xl shadow-md text-center">
      <h1 className="text-2xl font-bold text-blue-600">Sign In</h1>
      <p className="mt-4 text-gray-600">Please enter your credentials</p>
      <form>
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
              type="text"
              className="block mt-2 w-full p-1 border-b-1 border-b-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button
          type="submit"
          className="mt-8 w-64 p-2 bg-blue-600 text-lg font-medium text-white rounded-3xl hover:bg-blue-700"
          onClick={handleLogin}>
          SIGN IN
        </button>
      </form>
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </main>
  );
};

export default LoginPage;
