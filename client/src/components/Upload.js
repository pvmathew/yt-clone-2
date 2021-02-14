import React, { useState } from "react";
import {
  Container,
  Header,
  Segment,
  Form,
  Checkbox,
  Button,
  Divider,
} from "semantic-ui-react";
import FlashMessage from "./FlashMessage";
import Nav from "./Nav";
import Footer from "./Footer";
import { handleUpload } from "../api/upload";

const Upload = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState([]);

  return (
    <Container fluid id="main-container">
      <Nav />
      <Segment>
        <Container text>
          <Segment id="uploader-container">
            <Header as="h1">Upload a Video</Header>
            <Divider />
            <Form onSubmit={() => handleUpload({ name, desc, files })}>
              <Form.Field>
                <label>Video Title</label>
                <input onChange={(e) => setName(e.target.value)} value={name} />
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <textarea
                  style={{ height: 200 }}
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox label="Public" />
              </Form.Field>
              <Form.Field>
                <input
                  type="file"
                  accept="video/mp4,video/x-m4v,video/*"
                  onChange={(e) => setFiles(e.target.files)}
                ></input>
              </Form.Field>
              <Button type="submit">Submit</Button>
              <FlashMessage>{message}</FlashMessage>
            </Form>
          </Segment>
        </Container>
      </Segment>
      <Footer />
    </Container>
  );
};

export default Upload;
