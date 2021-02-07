import React from "react";
import ReactPlayer from "react-player/file";
import {
  Container,
  Header,
  Segment,
  Image,
  List,
  Dimmer,
  Loader,
  Icon,
  Grid,
  Divider,
  TextArea,
  Button,
} from "semantic-ui-react";
import FlashMessage from "./FlashMessage";
import Nav from "./Nav";
import Footer from "./Footer";
import { useContext } from "react";
import { Context } from "../AppContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ResultsList from "./ResultsList";
import { useState } from "react";
import { getVideo } from "../api/video";

const Home = (props) => {
  const { message } = useContext(Context);
  const { id } = useParams();

  const [video, setVideo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getVideo(id);
      setVideo(data);
    };
    fetchData();
  }, [id]);

  // if (!video) {
  //   return <Loader />;
  // }

  return (
    <Container
      fluid
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.87)",
        minHeight: "100vh",
      }}
    >
      <Nav />
      <Segment
        fluid
        style={{
          paddingTop: "7em",
          paddingBottom: "4em",
          backgroundColor: "white",
          margin: 0,
        }}
      >
        <Container text>
          <FlashMessage>{message}</FlashMessage>
          <Header as="h2">{video.t_name_video}</Header>

          <Segment.Group>
            <Segment>
              <ReactPlayer url={video.t_url} controls={true} width="100%" />
            </Segment>
            <Segment textAlign="right">
              <Image
                src="../../images/image.png"
                circular
                style={{
                  border: "white 2px solid",
                  boxShadow: "0px 0px 1px #999",
                }}
                avatar
              />

              {video.t_name_user}
              <Divider />
              {video.t_desc}
            </Segment>
            <Segment.Group horizontal>
              <Segment>
                <p>{Date(video.d_upload_date)}</p>
              </Segment>
              <Segment textAlign="right">
                <p style={{ display: "inline", marginRight: "0.5em" }}>
                  {video.i_num_views}
                </p>
                <Icon name="eye"></Icon>
              </Segment>
              <Segment textAlign="right">
                <p style={{ display: "inline", marginRight: "0.5em" }}>0</p>
                <Icon name="thumbs up"></Icon>
              </Segment>
            </Segment.Group>
          </Segment.Group>

          <Segment>COMMENTS - 0</Segment>
          <Image
            src="../../images/image.png"
            circular
            style={{
              border: "white 2px solid",
              boxShadow: "0px 0px 1px #999",
            }}
            avatar
          />

          {/* {video.t_name_user}
          <span style={{ display: "block" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
            numquam officiis velit fugit corrupti, expedita odio, voluptate
            commodi harum exercitationem repellendus totam. Assumenda soluta
            animi eaque iusto maiores amet temporibus.
          </span> */}
          <Divider />

          {/* <Segment> */}
          <Segment style={{ padding: 0 }} attached>
            <TextArea
              rows={3}
              style={{
                minWidth: "100%",
                maxWidth: "100%",
                border: "none",
              }}
            ></TextArea>
          </Segment>
          <Button attached="bottom">
            Send
            <Icon name="right arrow" />
          </Button>
        </Container>
      </Segment>
      <Footer />
    </Container>
  );
};

export default Home;
