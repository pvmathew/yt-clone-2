import FlashMessage from "./FlashMessage";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../AppContext";
import React, { useState, useContext } from "react";
import { sendRegisterRequest } from "../api/auth";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Container,
} from "semantic-ui-react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login, message, setMessage } = useContext(Context);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      setMessage("Please enter a valid email!");
    } else {
      const newUser = { username, email, password, confirmPassword };
      const { success, message } = await sendRegisterRequest(newUser);
      if (success) {
        login();
        setMessage(message);
        setTimeout(() => {
          setMessage("");
          history.push("/home");
        }, 3000);
      } else {
        setMessage(message);
      }
    }
  };

  return (
    <Container
      fluid
      style={{
        backgroundImage: `url(${"images/main-bg.jpeg"})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right center",
      }}
    >
      <p
        style={{
          position: "absolute",
          right: "25px",
          bottom: "50px",
          color: "white",
        }}
      >
        Created by Pavin Mathew
      </p>
      <Button
        href="https://www.pavinmathew.com"
        basic
        color="yellow"
        size="small"
        style={{
          position: "absolute",
          right: "20px",
          bottom: "20px",
        }}
      >
        View my Portfolio
      </Button>
      <Grid.Column style={{ maxWidth: 320 }}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Segment style={{ height: "100vh" }}>
            <Header
              as="h1"
              textAlign="center"
              style={{ fontSize: "4em", marginTop: 20 }}
            >
              MeTube
            </Header>
            <Header as="h2" textAlign="center">
              Register a new account
            </Header>
            <Form.Input
              fluid
              icon="envelope"
              iconPosition="left"
              placeholder="E-mail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            <Form.Input
              fluid
              icon=""
              iconPosition="left"
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
            />

            <Button fluid size="large" type="submit" data-testid="login-button">
              Register
            </Button>
            <Message>
              <Link to="/login">Wait, I already have an account!</Link>
            </Message>
            <FlashMessage>{message}</FlashMessage>
          </Segment>
        </Form>
      </Grid.Column>
    </Container>
  );

  // return (
  //   <Fragment>
  //     <div className="login-window">
  //       <div className="logo">MeTube</div>

  //       <div className="window-header">Register</div>

  //       <form id="login-form" onSubmit={(e) => handleSubmit(e)}>
  //         <input
  //           type="text"
  //           placeholder="username"
  //           value={username}
  //           onChange={(e) => setUsername(e.target.value)}
  //         />
  //         <input
  //           type="text"
  //           placeholder="email"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //         />
  //         <input
  //           type="password"
  //           placeholder="password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //         />
  //         <input
  //           type="password"
  //           placeholder="confirm password"
  //           value={confirmPassword}
  //           onChange={(e) => setConfirmPassword(e.target.value)}
  //         />
  //         <button type="submit">Create Account</button>
  //         {errorMessage && <div className="error-bubble">{errorMessage}</div>}
  //       </form>

  //       <Link to="/login">I already have an account.</Link>
  //     </div>
  //   </Fragment>
  // );
};

export default Register;
