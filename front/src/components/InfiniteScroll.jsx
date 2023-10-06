import React from "react";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import InfiniteScrollComponent from "react-infinite-scroll-component";

function InfiniteScroll({ results = [], hasMore, fetchMoreData }) {
  return (
    <InfiniteScrollComponent
      dataLength={results.length}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      next={fetchMoreData}
      results={results}
    >
      {console.log("Results:", results)}
      <List>
        {results.map((item) => (
          <ListItem key={item.id}>{item.title}</ListItem>
        ))}
      </List>
    </InfiniteScrollComponent>
  );
}

export default InfiniteScroll;
