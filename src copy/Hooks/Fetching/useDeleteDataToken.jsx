import { useState } from "react";
import BASE_URL from "Utilities/BASE_URL";

const useDeleteDataToken = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (url, token) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/${url}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Network response was not ok");
      const result = await res.json();
      setResponse(result);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, deleteData };
};

export default useDeleteDataToken;
