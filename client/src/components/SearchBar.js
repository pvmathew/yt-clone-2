import React, { useState, useContext } from "react";
import { Icon, Form } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { Context } from "../AppContext";

const SearchBar = () => {
  const SearchIcon = <Icon name="search" />;
  const { searchFor } = useContext(Context);
  const [input, setInput] = useState("");
  const history = useHistory();

  return (
    <Form
      onSubmit={() => {
        if (input) {
          searchFor(input);
          history.push("/results");
        }
      }}
      style={{ padding: 10, margin: 0 }}
    >
      <Form.Input
        action={{
          content: SearchIcon,
          style: { paddingRight: 10, left: 0 },
          onClick: () => history.push("/results"),
        }}
        onChange={(e) => setInput(e.target.value)}
        value={input}
      ></Form.Input>
    </Form>
  );
};

export default SearchBar;
