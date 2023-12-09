import React, { useState, useMemo, useCallback } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import {
  Button,
  Grid,
  Card,
  Typography,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import "./css/icon-list.css";
import { useIconListContext } from "./contexts/icon-list";
import { CopyBlock, dracula } from "react-code-blocks";
import debounce from "lodash/debounce";

function SearchBox() {
  const { setData, fetchJSON, setLoading } = useIconListContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback(
    debounce(async (searchValue) => {
      const filterData = await getFilterData(searchValue);
      setData({ total: filterData.length, fileNames: filterData });
    }, 500),
    []
  );
  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    handleSearch(value);
  };
  const getFilterData = async (name) => {
    setLoading(true);
    const { fileNames = [] } = await fetchJSON();
    setLoading(false);
    const filterData = fileNames.filter((item) => {
      return item.name.toLowerCase().includes(name);
    });
    return filterData;
  };

  return (
    <TextField
      value={searchTerm}
      onChange={handleChange}
      variant="outlined"
      fullWidth
      placeholder="Search icons"
      size="small"
      InputProps={{
        startAdornment: <SearchIcon sx={{ color: "gray" }} />,
      }}
    />
  );
}

function ListWithPagination() {
  const { iconList } = useIconListContext();
  const { fileNames: data = [] } = iconList;
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setOpen(true);
  };

  // 计算分页数据
  const itemsPerPage = 50;
  const numPages = useMemo(
    () => Math.ceil(data.length / itemsPerPage),
    [data.length]
  );
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = useMemo(
    () => data.slice(startIndex, endIndex),
    [startIndex, endIndex, data]
  );

  return (
    <Box>
      <Grid container spacing={2}>
        {paginatedData.map((item, index) => (
          <Grid item key={index}>
            <Card
              className="p-icon-container"
              sx={{
                bgcolor: "#F3F6F9",
              }}
            >
              <Box
                className="p-icon-item"
                onClick={() => handleCardClick(item)}
                sx={{
                  ":hover": { background: "#ffff",cursor: "pointer" },
                }}
              >
                 <p-icon size='large' name={item.name}></p-icon>
              </Box>
              <Box className="p-icon-ellipsis">
                <Typography variant="caption" color="text.secondary">
                  {item.name}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        sx={{ my: 2 }}
        count={numPages}
        page={page}
        onChange={handleChangePage}
      />
      {selectedCard && (
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>{selectedCard.name}</DialogTitle>
          <DialogContent sx={{ minWidth: 400 }}>
            <CopyBlock
              text={`<p-icon name="${selectedCard.name}"></p-icon>`}
              language="html"
              showLineNumbers="true"
              theme={dracula}
            ></CopyBlock>
            <Card sx={{textAlign:'center',padding:1,my:2, bgcolor: "#F3F6F9",}}>
              <p-icon size='large' name={selectedCard.name}></p-icon>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

export default function IconList() {
  const { iconList, loading } = useIconListContext();
  return (
    <div>
      <SearchBox />
      <Box sx={{ my: 1 }}>{iconList.total} matching results</Box>
      {loading ? (
        <Box sx={{ textAlign: "center", minHeight: "800px" }}>
          <CircularProgress></CircularProgress>
        </Box>
      ) : (
        <ListWithPagination></ListWithPagination>
      )}
    </div>
  );
}
