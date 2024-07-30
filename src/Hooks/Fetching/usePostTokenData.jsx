import { useState } from "react";
import BASE_URL from "Utilities/BASE_URL";

const usePostDataToken = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (url, data, token) => {
    setLoading(true);
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      const res = await fetch(`${BASE_URL}/${url}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Network response was not ok");
      const result = await res.json();
      setResponse(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, postData };
};

export default usePostDataToken;
