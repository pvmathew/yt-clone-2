import React from "react";
import { Menu, Input } from "semantic-ui-react";

const DashboardMenu = () => {
  let activeItem = "";

  return (
    <Menu
      vertical
      style={{ position: "fixed", marginLeft: "-18em", marginTop: 0 }}
      className="computer only"
    >
      <Menu.Item name="inbox" active={activeItem === "inbox"}>
        {/* <Label color="teal">1</Label> */}
        <Menu.Header>Uploads</Menu.Header>

        <Input icon="search" placeholder="Search videos..." />

        <Menu.Menu>
          <Menu.Item name="comments" active={activeItem === "comments"} />
          <Menu.Item name="likes" active={activeItem === "likes"} />
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item name="spam" active={activeItem === "spam"}>
        Account
      </Menu.Item>

      <Menu.Item name="updates" active={activeItem === "updates"}>
        Settings
      </Menu.Item>
    </Menu>
  );
};

export default DashboardMenu;
