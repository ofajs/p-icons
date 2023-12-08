import { createContext, useContext, useEffect, useState } from "react";

const IconListContext = createContext({});
const { Provider } = IconListContext;

function IconListProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ total: 0, fileNames: [] });
  const fetchJSON = () => {
    return fetch(
      "https://cdn.jsdelivr.net/npm/p-icons/lib/svg-files.json"
    ).then((res) => res.json());
  };
  useEffect(() => {
    fetchJSON().then((data) => {
      setLoading(false);
      setData(data);
    });
  }, []);

  return (
    <Provider
      value={{ iconList: data, setData, setLoading, loading, fetchJSON }}
    >
      {children}
    </Provider>
  );
}

function useIconListContext() {
  const result = useContext(IconListContext);
  return result;
}
export { useIconListContext, IconListProvider };
