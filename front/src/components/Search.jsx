import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import debounce from "lodash/debounce";
import InfiniteScroll from "./InfiniteScroll";
import { fetchSearchResults } from "../services/apiService";
import { Link } from "react-router-dom";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchResults = debounce(async () => {
    const data = await fetchSearchResults(searchTerm, page);

    // Check if data and data.results exist, then check the length
    if (data && data.results && data.results.length === 0) {
      setHasMore(false);
    } else if (data && data.results) {
      setResults((prevItems) => [...prevItems, ...data.results]);
      setPage((prevPage) => prevPage + 1);
    }
  }, 300);

  useEffect(() => {
    if (searchTerm.length > 2) {
      setResults([]);
      setPage(1);
      setHasMore(true);
      fetchResults();
    }
  }, [searchTerm]);

  return (
    <div>
      <TextField
        fullWidth
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <InfiniteScroll results={results} hasMore={hasMore}>
          {results.map((item) => (
            <ListItem key={item.id}>
              <Link to={`/todo/${item.id}`}>{item.name}</Link>
            </ListItem>
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
}

export default Search;
