import { useState } from "react";
import BASE_URL from "Utilities/BASE_URL";

const usePostToken = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const postData = async (url, token) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/${url}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res);

      if (!res.ok) throw new Error("Network response was not ok");
      const result = await res.json();

      setResponse(result);
      return result;
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, postData };
};

export default usePostToken;
