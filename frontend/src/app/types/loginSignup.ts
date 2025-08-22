export interface LoginProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string;
  setError: (error: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  viewPassword: boolean;
  setViewPassword: (view: boolean) => void;
}

export interface SignUpProps {
  firstName: string;
  setFirstName: (name: string) => void;
  lastName: string;
  setLastName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string;
  setError: (error: string) => void;
  setDisplay: (display: "login" | "signup") => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  viewPassword: boolean;
  setViewPassword: (view: boolean) => void;
}
