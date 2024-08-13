import { useState, useEffect } from "react";
import BASE_URL from "Utilities/BASE_URL";

const useGetDataToken = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (url, token) => {
    try {
      const response = await fetch(`${BASE_URL}/${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useGetDataToken;
