import React, { useEffect } from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import FlashMessage from "./FlashMessage";
import Nav from "./Nav";
import Footer from "./Footer";
import { useContext } from "react";
import { Context } from "../AppContext";

const Home = (props) => {
  const { message } = useContext(Context);

  return (
    <Container
      fluid
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.87)",
        minHeight: "100vh",
      }}
    >
      <Nav />
      <Segment>
        <Container text>
          <FlashMessage>{message}</FlashMessage>
          <Header as="h1">Welcome to MeTube!</Header>
          <p>Try typing into the search bar above to look for a video.</p>
        </Container>
      </Segment>
      <Footer />
    </Container>
  );
};

export default Home;
