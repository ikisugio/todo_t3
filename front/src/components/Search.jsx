import React, { useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import debounce from "lodash/debounce";
import InfiniteScroll from "./InfiniteScroll";
import { fetchSearchResults } from "../services/apiService";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}/`);
  };

  const fetchResults = async () => {
    const data = await fetchSearchResults(searchTerm, page);

    if (data && data.length === 0) {
      setHasMore(false);
    } else if (data) {
      setResults((prevItems) => [...prevItems, ...data]);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const debouncedFetchResults = debounce(fetchResults, 300);

  useEffect(() => {
    setResults([]);
    setPage(1);
    setHasMore(true);
    if (searchTerm.length >= 1) {
      debouncedFetchResults();
    }

    const handleBeforeUnload = () => {
      localStorage.removeItem("tempSearchTerm");
    };

    // ページがアンロードされる直前に tempSearchTerm をクリア
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      if (searchTerm) {
        localStorage.setItem("tempSearchTerm", searchTerm);
      }

      // イベントリスナーを削除
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [searchTerm]);

  useEffect(() => {
    const tempSearchTerm = localStorage.getItem("tempSearchTerm");
    if (tempSearchTerm && tempSearchTerm.length > 0) {
      setSearchTerm(tempSearchTerm);
    }
  }, []);

  return (
    <div>
      <p>これはテストメッセージです。</p>
      <TextField
        fullWidth
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {results.map((item) => (
        <Card
          key={item.id}
          variant="outlined"
          style={{
            margin: "16px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div">
              {item.title}
            </Typography>
          </CardContent>
          <Button onClick={() => handleEdit(item.id)} color="primary">
            編集
          </Button>
        </Card>
      ))}
    </div>
  );
}

export default Search;
