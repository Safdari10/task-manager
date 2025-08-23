interface SignupPageProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  setError: (error: string) => void;
}

export const signup = async ({
  firstName,
  lastName,
  email,
  password,
  setError,
}: SignupPageProps) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_SIGNUP_URL || "http://localhost:8000/auth/register";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      setError?.(errorData.message || "Signup failed");
      return null;
    }
    return await response.json();
  } catch (error) {
    setError(`Signup Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    return null;
  }
};
