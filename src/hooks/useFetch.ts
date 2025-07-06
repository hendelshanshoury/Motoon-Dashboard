import { useEffect, useState } from "react";
import { delData, getData } from "../utils/fetch";

const useFetch = ({ url, config = {}, deleteurl }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const [isDelLoading, setIsDelLoading] = useState(false);
  const [statusDel, setStatusDel] = useState(false);

  const fetchData = async (URL = url, CONFIG = config) => {
    setIsLoading(true);
    try {
      const { data, status }: any = await getData(URL, CONFIG);
      setData(data?.data);
      setStatus(status);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // DELETING ITEM
  const deleteItem = async (id: number) => {
    setIsDelLoading(true);
    try {
      const { data, status }: any = await delData(deleteurl + `/${id}`);
      if (status == 200) {
        console.log("done ok");
      }
      setStatus(status);
      if (status == 200) {
        fetchData();
      }
      return { data, status, statusText };
    } catch (error) {
      setStatusDel(error);
    } finally {
      setIsDelLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    refetch: fetchData,
    isLoading,
    status,
    deleteItem,
    isDelLoading,
    statusDel,
    error,
  };
};

export default useFetch;
