import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Menu,
  Button,
  Image,
  Dropdown,
  Icon,
} from "semantic-ui-react";
import { Context } from "../AppContext";
import { sendLogoutRequest } from "../api/auth";
import { useHistory } from "react-router-dom";
import SearchBar from "./SearchBar.js";
import "../App.css";

const Nav = () => {
  const { logout, setMessage, isLoggedIn } = useContext(Context);
  const history = useHistory();

  const [width, setWidth] = useState(window.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  let isMobile = width <= 768;

  const handleLogout = async () => {
    const { success, message } = await sendLogoutRequest();

    if (success) {
      setMessage(message);
      setTimeout(() => {
        setMessage("");
        logout();
        history.push("/login");
      }, 3000);
    }
  };

  const ProfilePic = (
    <Image
      src="../../images/image.png"
      circular
      style={{
        height: "40px",
        minWidth: "40px",
        maxWidth: "40px",
        border: "white 2px solid",
        boxShadow: "0px 0px 1px #999",
      }}
    />
  );

  const options = [
    {
      key: "uploads",
      text: "My Videos",
      icon: "video",
      onClick: () => history.push("/dashboard"),
    },
    {
      key: "user",
      text: "Account",
      icon: "user",
      onClick: () => history.push("/dashboard"),
    },
    {
      key: "settings",
      text: "Settings",
      icon: "settings",
      onClick: () => history.push("/dashboard"),
    },
  ];

  return (
    <Menu fixed={isMobile ? null : "top"} stackable>
      <Container style={{ backgroundColor: "white" }}>
        <Menu.Item header>
          <Icon name="caret square right" />
          <span style={{}}>MeTube</span>
        </Menu.Item>
        <Menu.Item as="a" onClick={() => history.push("/home")}>
          Home
        </Menu.Item>
        {/* <Menu.Item as="a" onClick={() => history.push("/home")}>
          Trending
        </Menu.Item> */}
        <Menu.Item as="a" onClick={() => history.push("/upload")}>
          Upload
        </Menu.Item>
        <SearchBar />
      </Container>
      <Menu.Menu position="right" className="not-stackable">
        <Menu.Item>
          <Dropdown
            trigger={ProfilePic}
            options={options}
            pointing="top left"
            icon={null}
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              marginRight: "25px",
              display: "inline-block",
              width: "30px",
            }}
          />
          {isLoggedIn ? (
            <Button color="red" onClick={() => handleLogout()}>
              Logout
            </Button>
          ) : (
            <Button color="grey" onClick={() => history.push("/login")}>
              Login
            </Button>
          )}
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Nav;
