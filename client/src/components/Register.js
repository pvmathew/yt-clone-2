import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // const newUser = { username, email, password, confirmPassword };

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
    } else {
      // const response = await fetch("http://localhost:5000/user/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(newUser),
      //   mode: "cors",
      // });
      // const data = await response.json();
      // console.log(data);
    }
  };

  return (
    <Fragment>
      <div className="login-window">
        <div className="logo">MeTube</div>

        <div className="window-header">Register</div>

        <form id="login-form" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Create Account</button>
          {errorMessage && <div className="error-bubble">{errorMessage}</div>}
        </form>

        <Link to="/">I already have an account.</Link>
      </div>
    </Fragment>
  );
};

export default Login;
