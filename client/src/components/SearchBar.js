import React, { Fragment, useState, useContext } from "react";
import { Button, Input, Icon, Grid, Responsive, Form } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { Context } from "../AppContext";

const SearchBar = () => {
  const SearchIcon = <Icon name="search" />;
  const LogoutIcon = <Icon name="sign-out" />;
  const { searchTerm, setSearchTerm } = useContext(Context);
  const history = useHistory();

  return (
    <Form
      onSubmit={() => history.push("/results")}
      style={{ padding: 10, margin: 0 }}
    >
      <Form.Input
        action={{
          content: SearchIcon,
          style: { paddingRight: 10, left: 0 },
          onClick: () => history.push("/results"),
        }}
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      ></Form.Input>
    </Form>
  );
};

export default SearchBar;
