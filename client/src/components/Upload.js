import React, { Fragment, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Header,
  Segment,
  Form,
  Checkbox,
  Button,
  Divider,
} from "semantic-ui-react";
import { Context } from "../AppContext";
import FlashMessage from "./FlashMessage";
import Nav from "./Nav";
import Footer from "./Footer";

const Upload = () => {
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState([]);

  const history = useHistory();

  const { logout } = useContext(Context);

  const handleUpload = async (e) => {
    e.preventDefault();

    //make form data and append the selected file
    const fd = new FormData();
    fd.append("file", file[0], file[0].name);
    fd.append("name", name);
    fd.append("desc", desc);

    const response = await fetch("http://localhost:2000/file/upload", {
      method: "POST",
      body: fd,
      mode: "cors",
      credentials: "include",
    });

    const data = await response.json();
    const { message } = data;
    setMessage(message);

    if (response.status >= 200 && response.status < 300) {
      setTimeout(() => {
        history.push("/home");
      }, 3000);
    } else if (response.status > 300) {
      setTimeout(() => {
        logout();
      }, 3000);
    }
  };
  return (
    <Container fluid id="main-container">
      <Nav />
      <Segment fluid>
        <Container text>
          <Segment id="uploader-container">
            <Header as="h1">Upload a Video</Header>
            <Divider />
            <Form onSubmit={(e) => handleUpload(e)}>
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
                  onChange={(e) => setFile(e.target.files)}
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

    // <Fragment>
    //   <FlashMessage>{message}</FlashMessage>
    //   You've made it to the upload page!
    //   <form onSubmit={(e) => handleUpload(e)}>
    //     <input
    //       type="text"
    //       onChange={(e) => setName(e.target.value)}
    //       placeholder="video name"
    //     ></input>
    //     <input
    //       type="text"
    //       onChange={(e) => setDesc(e.target.value)}
    //       placeholder="desc"
    //     ></input>
    //     <input type="file" onChange={(e) => setFile(e.target.files)}></input>
    //     <button type="submit">Upload Video</button>
    //   </form>
    // </Fragment>
  );
};

export default Upload;
