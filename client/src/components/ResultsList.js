import React, { Fragment, useContext } from "react";
import { List, Icon, Grid } from "semantic-ui-react";
import { Context } from "../AppContext";
import ResultItem from "./ResultListtem";

const ResultsList = () => {
  const { results } = useContext(Context);

  return (
    <Fragment>
      <Grid divided>
        <Grid.Column width={14}>
          <p>
            {results.length} of {results.length} Results
          </p>
        </Grid.Column>
        <Grid.Column floated="right" width={2}>
          <Icon name="list" />
        </Grid.Column>
      </Grid>
      <List>
        {/* <Grid>
          {results.map((result) => (
            <ResultGridItem result={result} />
          ))}
        </Grid> */}
        {results.map((result, index) => (
          <ResultItem key={index} result={result} />
        ))}
      </List>
    </Fragment>
  );
};

export default ResultsList;
