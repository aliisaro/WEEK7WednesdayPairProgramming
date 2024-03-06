import React from "react";
import useSignup from "../hooks/useSignup";
import useField from "../hooks/useField";

const SignupComponent = ({ setIsAuthenticated }) => {
  const emailInput = useField("");
  const passwordInput = useField("");

  const { handleSignup } = useSignup(setIsAuthenticated);

  const handleSignupClick = () => {
    handleSignup(emailInput.value, passwordInput.value);
  };

  return (
    <div>
      <h2>Signup</h2>
      <label>
        email:
        <input type="email" placeholder="write your email" {...emailInput} />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          placeholder="write password"
          {...passwordInput}
        />
      </label>
      <br />
      <button onClick={handleSignupClick}>Signup</button>
    </div>
  );
};

export default SignupComponent;