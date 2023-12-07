import { createContext, useContext, useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";

const IconListContext = createContext({});
const { Provider } = IconListContext;

function IconListProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/p-icons/lib/svg-files.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setData(data);
      });
  }, []);
  if (loading) {
    return (
      <Box sx={{ textAlign: "center",minHeight:'800px' }}>
        <CircularProgress></CircularProgress>
      </Box>
    );
  }
  return <Provider value={data}>{children}</Provider>;
}

function useIconListContext() {
  const result = useContext(IconListContext);
  return result;
}
export { useIconListContext, IconListProvider };
