import { useNavigate } from "react-router-dom";

const useSignup = (setIsAuthenticated) => {
  const navigate = useNavigate();

  const handleSignup = async (email, password) => {
    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response:", response); // Log the response

      if (response.ok) {
        const user = await response.json();
        sessionStorage.setItem("user", JSON.stringify(user));
        console.log("User signed up successfully!");
        setIsAuthenticated(true);
        navigate("/");
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return {
    handleSignup,
  };
};

export default useSignup;