import { useState } from "react";
import BASE_URL from "Utilities/BASE_URL";

const usePostData = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (url, data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      const res = await fetch(`${BASE_URL}/${url}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Network response was not ok");
      const result = await res.json();
      setResponse(result);
      return result; // Return the response data
    } catch (err) {
      setError(err.message);
      throw err; // Rethrow the error for handling in submitForm
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, postData };
};

export default usePostData;
