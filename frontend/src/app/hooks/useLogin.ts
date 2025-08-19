interface LoginProps {
  email: string;
  password: string;
  setError: (error: string) => void;
}

export const login = async ({ email, password, setError }: LoginProps) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_LOGIN_URL || "http://localhost:8000/login";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      setError(errorData.detail || "Login failed");
      return null;
    }
    return await response.json();
  } catch (error) {
    setError(`Login error: ${error instanceof Error ? error.message : "Unknown error"}`);
    return null;
  }
};
