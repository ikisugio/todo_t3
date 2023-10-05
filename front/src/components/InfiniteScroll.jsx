import React from "react";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import InfiniteScrollComponent from "react-infinite-scroll-component";

function InfiniteScroll({ results, hasMore }) {
  return (
    <InfiniteScrollComponent
      dataLength={results.length}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <List>
        {results.map((item) => (
          <ListItem key={item.id}>{item.name}</ListItem>
        ))}
      </List>
    </InfiniteScrollComponent>
  );
}

export default InfiniteScroll;
