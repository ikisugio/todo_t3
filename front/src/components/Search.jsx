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
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import { LinearProgress } from "@mui/material";

const ProgressContainer = styled.div`
  position: absolute;
  width: 100%;
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    border-radius: 32px;
    transition: box-shadow 0.3s ease, border-color 0.3s ease;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    // フォーカス時の虫眼鏡マークの色変更
    &.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root {
      color: ${(props) => props.theme.palette.primary.main};
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => props.theme.palette.primary.main};
      box-shadow: 0 0 15px
        rgba(${(props) => props.theme.palette.primary.main}, 0.2);
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => props.theme.palette.primary.main};
      box-shadow: none;
    }

    .MuiOutlinedInput-notchedOutline {
      border-width: 1.2px;
      border-color: lightgray;
    }
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const StyledCard = styled(Card)`
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  padding: 8px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
  border: 1.2px solid lightgray;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    border: 1.5px solid ${(props) => props.theme.palette.primary.main};
  }

  &.Mui-focusVisible,
  &:focus-within {
    box-shadow: 0 0 10px
      rgba(${(props) => props.theme.palette.primary.main}, 0.3);
  }

  &:focus-within {
    .editButton {
      background-color: ${(props) => props.theme.palette.primary.main};
      color: transparent;
    }
  }
`;

const EditButton = styled(Button)`
  background-color: transparent;
  color: gray; // 通常時の鉛筆マークは灰色

  height: 100%;
  margin: 8px 4px;
  box-shadow: 0 0 rgba(0, 0, 0, 0);
  transition: color 0.3s ease;
  border: none;

  &:hover,
  &:active,
  &&.MuiButton-outlinedPrimary:hover,
  &&.MuiButton-outlinedPrimary:active {
    background-color: transparent;
    color: ${(props) => props.theme.palette.primary.main};
    box-shadow: 0 0 rgba(0, 0, 0, 0);
    border: none;
  }

  min-width: auto;
  padding: 2px;

  .MuiButton-label {
    justify-content: center;
  }

  .MuiButton-startIcon {
    margin-right: 4px; // この値を調整して間隔を詰める
  }
`;

const CardItemText = styled(Typography)`
  flex: 1;
  margin-left: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-left: 1px solid lightgray;
  padding-left: 16px;
`;

const SearchContainer = styled.div`
  flex: 1;
  padding: 16px;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
  width: 30%;
  min-width: 300px;
`;

const ResultsContainer = styled.div`
  flex: 2;
  overflow-y: auto;
  padding: 16px;
  height: calc(100vh - 136px);

  // スクロールバーのデザイン
  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.palette.primary.main};
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(120, 100, 255, 0.1); // もう少し薄い紫色
  }

  // Firefoxの場合のスクロールバーのデザイン
  scrollbar-color: ${(props) => props.theme.palette.primary.main}
    rgba(120, 100, 255, 0.1);
  scrollbar-width: thin;
`;

const ResultsCount = styled.div`
  font-size: 14px;
  color: #999; // 薄い色で表示
  margin-bottom: 16px;
`;

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}/`);
  };

  const handleWheel = (e) => {
    const container = document.getElementById("results-container");
    if (container) {
      // deltaYプロパティでマウスホイールの移動量を取得し、スクロール位置を更新
      container.scrollTop += e.deltaY;
    }
  };

  const fetchResults = async () => {
    setIsLoading(true);
    const data = await fetchSearchResults(searchTerm, page);
    setIsLoading(false);

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
    <Container>
      <SearchContainer>
        <StyledTextField
          fullWidth
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon color="action" style={{ marginRight: 8 }} />
            ),
          }}
        />
        <ResultsCount>{results.length} 件の結果</ResultsCount>{" "}
        {/* 検索件数の表示 */}
        {isLoading && ( // 検索中にプログレスバーを表示
          <LinearProgress />
        )}
      </SearchContainer>
      <ResultsContainer onWheel={handleWheel} id="results-container">
        {results.map((item) => (
          <StyledCard key={item.id} variant="outlined">
            <EditButton
              className="editButton"
              onClick={() => handleEdit(item.id)}
              variant="outlined"
              color="primary"
              disableRipple={true}
              disableTouchRipple={true}
              startIcon={<EditIcon />}
            >
              EDIT
            </EditButton>
            <CardItemText variant="h6" component="div">
              {item.title}
            </CardItemText>
          </StyledCard>
        ))}
      </ResultsContainer>
    </Container>
  );
}

export default Search;
