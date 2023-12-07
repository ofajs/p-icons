import React, { useState, useMemo } from "react";
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
} from "@mui/material";
import "./css/icon-list.css";
import { useIconListContext } from "./contexts/icon-list";
import { CopyBlock, dracula } from "react-code-blocks";

function SearchBox() {
  return (
    <TextField
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
// 假设数据源为一个包含所有数据的数组
function ListWithPagination() {
  const { fileNames: data } = useIconListContext();
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
  const itemsPerPage = 100;
  const numPages = useMemo(
    () => Math.ceil(data.length / itemsPerPage),
    [data.length]
  );
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = useMemo(
    () => data.slice(startIndex, endIndex),
    [startIndex, endIndex]
  );

  // xs={6} sm={4} md={2} lg={1}
  return (
    <Box>
      <Grid container spacing={2}>
        {paginatedData.map((item, index) => (
          <Grid item key={index}>
            <Card
              onClick={() => handleCardClick(item)}
              className="p-icon-container"
              sx={{
                bgcolor: "#F3F6F9",
              }}
            >
              <Box
                className="p-icon-item"
                sx={{
                  display: "flex",
                  padding: 1,
                  ":hover": { background: "#ffff", cursor: "pointer" },
                }}
              >
                <SearchIcon sx={{ color: "gray" }} />
              </Box>
              <Box className="p-icon-ellipsis">
                <Typography variant="caption" color="text.secondary">
                  icon 名称 {item.name}
                </Typography>
              </Box>
            </Card>
            <l-m src={`https://cdn.jsdelivr.net/npm/p-icons/lib/${item.name}.html`}></l-m>
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
          <DialogContent sx={{minWidth:400}}>
            <CopyBlock
              text={`<${selectedCard.name}></${selectedCard.name}>`}
              language="html"
              showLineNumbers="true"
              wrapLines
              theme={dracula}
            ></CopyBlock>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>关闭</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

export default function IconList() {
  return (
    <div>
      <SearchBox />
      <Box sx={{ my: 1 }}>2016 matching results</Box>
      <ListWithPagination></ListWithPagination>
    </div>
  );
}
