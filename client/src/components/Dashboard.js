import React, { useEffect } from "react";
import {
  Container,
  Header,
  Menu,
  Segment,
  Label,
  Input,
} from "semantic-ui-react";
import FlashMessage from "./FlashMessage";
import Nav from "./Nav";
import Footer from "./Footer";
import DashboardMenu from "./DashboardMenu.js";
import { useContext } from "react";
import { Context } from "../AppContext";

const Dashboard = (props) => {
  const { message } = useContext(Context);

  return (
    <Container
      fluid
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.87)",
        minHeight: "100vh",
      }}
    >
      <Segment
        style={{
          paddingTop: "5em",
          paddingBottom: "4em",
          backgroundColor: "white",
          margin: 0,
        }}
      >
        <Nav />
        <Container text>
          <DashboardMenu />

          <FlashMessage>{message}</FlashMessage>
          <Header as="h1">Dashboard</Header>
          <Container style={{ minHeight: "300px" }}></Container>
        </Container>
      </Segment>
      <Footer />
    </Container>
  );
};

export default Dashboard;
