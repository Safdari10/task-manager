interface LoginSignupToggleProps {
  display: string;
  setDisplay: (display: string) => void;
}

const LoginSignupToggle = ({ display, setDisplay }: LoginSignupToggleProps) => {
  return (
    <>
      {display === "login" ? (
        <div className="flex flex-col items-center justify-center gap-60 p-14 w-[40%] h-[100vh] bg-gray-700 ">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-3xl font-bold text-blue-500">New here?</h1>
            <p className="text-white">sign up and discover</p>
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => setDisplay("signup")}>
            Sign Up
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-60 p-14 w-[40%] h-[100vh] bg-gray-700 ">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold text-blue-600">One of us?</h1>
            <p className="text-white">just sign in</p>
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => setDisplay("login")}>
            Sign In
          </button>
        </div>
      )}
    </>
  );
};

export default LoginSignupToggle;
