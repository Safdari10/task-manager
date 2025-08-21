interface LoginSignupToggleProps {
  display: string;
  setDisplay: (display: string) => void;
}

const LoginSignupToggle = ({ display, setDisplay }: LoginSignupToggleProps) => {
  return (
    <>
      {display === "login" ? (
        <div className="flex flex-col items-center justify-center gap-[250px] w-[40%] h-full pt-10 pb-20 px-14 bg-gray-700 ">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl font-bold text-blue-600">New here?</h1>
            <p className="text-lg text-white">Sign up and discover</p>
          </div>
          <button
            className="w-64 bg-blue-500 text-lg text-white py-2 px-4 rounded-3xl hover:bg-blue-600 transition-colors duration-300"
            onClick={() => setDisplay("signup")}>
            Sign Up
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-[250px] w-[40%] h-full pt-10 pb-20 px-14 bg-gray-700 ">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl font-bold text-blue-600">One of us?</h1>
            <p className="text-lg text-white">Just sign in</p>
          </div>
          <button
            className="w-64 bg-blue-500 text-lg text-white py-2 px-4 rounded-3xl hover:bg-blue-600 transition-colors duration-300"
            onClick={() => setDisplay("login")}>
            Sign In
          </button>
        </div>
      )}
    </>
  );
};

export default LoginSignupToggle;
