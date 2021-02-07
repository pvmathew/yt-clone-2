import React from "react";
import { Segment, Container, Grid, List, Header } from "semantic-ui-react";

const Footer = () => {
  return (
    <Segment vertical style={{ padding: "5em 0em" }} className="footer">
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a">Sitemap</List.Item>
                <List.Item as="a">Contact Us</List.Item>
                <List.Item as="a">Trending</List.Item>
                <List.Item as="a">Home</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as="a">Upload a Video</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={10}>
              <Header as="h4" inverted>
                MeTube
              </Header>
              <p>
                Search for your favorite videos anytime, anywhere.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};

export default Footer;
