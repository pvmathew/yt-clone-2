import React from "react";
import { Message } from "semantic-ui-react";

const FlashMessage = (props) => {
  const text = props.children;

  if (text)
    return (
      <Message data-testid="flash-message" info>
        <Message.Header>{text}</Message.Header>
      </Message>
    );
  else return null;
};

export default FlashMessage;
