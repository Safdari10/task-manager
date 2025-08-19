import React from "react";

const SignupPage = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <p>Please fill in the details to create an account.</p>
      <form>
        <label htmlFor="first_name">
          First Name
          <input type="text" id="first_name" name="first_name" required />
        </label>
        <label htmlFor="last_name">
          Last Name
          <input type="text" id="last_name" name="last_name" required />
        </label>
        <label htmlFor="email">
          Email
          <input type="email" id="email" name="email" required />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" id="password" name="password" required />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
