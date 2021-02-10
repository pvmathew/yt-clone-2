import React, { useState } from "react";
import {
  Image,
  Divider,
  Segment,
  TextArea,
  Button,
  Icon,
} from "semantic-ui-react";
import { sendComment } from "../api/video";
import { useParams } from "react-router-dom";

const Comment = (comment) => (
  <>
    <Image
      src="../../images/image.png"
      circular
      style={{
        border: "white 2px solid",
        boxShadow: "0px 0px 1px #999",
      }}
      avatar
    />

    {comment.username}
    <span style={{ display: "block" }}>{comment.comment}</span>
    <Divider />
  </>
);

const CommentSection = ({ comments, setComments, isLoggedIn }) => {
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();

  const Comments = comments
    ? comments.map((comment) => <Comment comment={comment} />)
    : null;
  return (
    <>
      <Segment>COMMENTS - 0</Segment>
      {Comments}
      <Segment style={{ padding: 0 }} attached>
        <TextArea
          onChange={(e) => setNewComment(e.target.value)}
          value={newComment}
          rows={3}
          style={{
            minWidth: "100%",
            maxWidth: "100%",
            border: "none",
          }}
        ></TextArea>
      </Segment>
      <Button
        disabled={!isLoggedIn}
        attached="bottom"
        onClick={async () => {
          let refreshedCommentsList = await sendComment(id, newComment);
          setComments([]);
        }}
      >
        Send
        <Icon name="right arrow" />
      </Button>
    </>
  );
};

export default CommentSection;
