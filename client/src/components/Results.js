import React from "react";
// import ReactPlayer from "react-player/file";
import { Container, Header, Segment, Image, List } from "semantic-ui-react";
import FlashMessage from "./FlashMessage";
import Nav from "./Nav";
import Footer from "./Footer";
import { useContext } from "react";
import { Context } from "../AppContext";
import { useEffect } from "react";
import ResultsList from "./ResultsList";

const Home = (props) => {
  const { message } = useContext(Context);

  useEffect(() => {
    console.log("Results page has been rendered.");
  }, []);

  return (
    <Container
      fluid
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.87)",
        minHeight: "100vh",
      }}
    >
      <Nav />
      <Segment fluid id="wrapper-segment">
        <Container text>
          <FlashMessage>{message}</FlashMessage>
          <Header as="h1">Search Results</Header>
          {/* <p>
            {results.length} of {results.length} Results
          </p> */}
          <ResultsList />
        </Container>
      </Segment>
      <Footer />
    </Container>
  );
};

export default Home;
