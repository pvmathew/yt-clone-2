import React, {  useState } from "react";
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

const Comment = ({ comment }) => (
  <>
    <Image
      src="../../images/image.png"
      circular
      style={{
        border: "white 2px solid",
        boxShadow: "0px 0px 1px #999",
        marginBottom: "5px"
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
    ? comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))
    : null;

  return (
    <>
      <Segment>COMMENTS - {comments ? comments.length : 0}</Segment>
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
        disabled={!isLoggedIn || !newComment.length}
        attached="bottom"
        onClick={async () => {
          let refreshedCommentsList = await sendComment(id, newComment);
          setComments(refreshedCommentsList.a_comments);
        }}
      >
        Send
        <Icon name="right arrow" />
      </Button>
    </>
  );
};

export default CommentSection;
