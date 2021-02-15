import React from "react";
import { Segment, Image, List, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const ResultItem = (props) => {
  const { result } = props;
  const history = useHistory();

  const thumbnailSize = { width: 16 * 15, height: 9 * 15 };

  return (
    <List.Item
      key={props.index}
      style={{ cursor: "pointer" }}
      onClick={() => history.push("/video/" + result.id)}
    >
      <Segment.Group>
        <Segment.Group horizontal>
          <Segment>
            <p>{result.t_name_video}</p>
            <p>{result.t_name_user}</p>
          </Segment>
          <div
            style={{
              width: thumbnailSize.width,
              height: thumbnailSize.height,
              border: "solid 1px lightgray",
              margin: "2px",
            }}
          >
            <Image
              src={result.t_thumb_url}
              onError={(e) => {
                e.target.src = "../images/image.png";
              }}
              alt="result thumbnail"
              style={{
                height: "100%",
                maxWidth: "100%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            ></Image>
          </div>
        </Segment.Group>
        <Segment.Group horizontal>
          <Segment>
            <p>{Date(result.d_upload_date)}</p>
          </Segment>
          <Segment textAlign="right">
            <p style={{ display: "inline", marginRight: "0.5em" }}>
              {result.i_num_views}
            </p>
            <Icon name="eye"></Icon>
          </Segment>
          <Segment textAlign="right">
            <p style={{ display: "inline", marginRight: "0.5em" }}>
              {result.i_num_likes}
            </p>
            <Icon name="thumbs up"></Icon>
          </Segment>
        </Segment.Group>
      </Segment.Group>
    </List.Item>
  );
};

export default ResultItem;
