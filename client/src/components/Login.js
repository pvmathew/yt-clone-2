import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Context } from "../AppContext";
import { sendLoginRequest } from "../api/auth";

import FlashMessage from "./FlashMessage";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Container,
} from "semantic-ui-react";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, message, setMessage } = useContext(Context);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { success, message } = await sendLoginRequest(email, password);
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
      <Grid.Column
        style={{ maxWidth: 320, boxShadow: "2px 10px 10px #000000" }}
      >
        <Form onSubmit={(e) => handleLogin(e)}>
          <Segment style={{ height: "100vh" }}>
            <Header
              as="h1"
              textAlign="center"
              style={{ fontSize: "4em", marginTop: 20 }}
            >
              MeTube
            </Header>
            <Header as="h2" textAlign="center">
              Login to your account
            </Header>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

            <Button fluid size="large" type="submit" data-testid="login-button">
              Login
            </Button>
            <Message>
              <Link to="/register">I don't have an account yet.</Link>
            </Message>
            <FlashMessage>{message}</FlashMessage>
          </Segment>
        </Form>
      </Grid.Column>
    </Container>
  );
};

export default Login;
