import { useState } from "react";
import BASE_URL from "Utilities/BASE_URL";

const usePostDataJson = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (url, data) => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const res = await fetch(`${BASE_URL}/${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify(data), // Convert data to JSON
      });

      if (!res.ok) {
        // Check if response is not ok and throw an error
        throw new Error(`HTTP error! status: ${res.status}`);
      }

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

  return { response, loading, error, postData, setError };
};

export default usePostDataJson;
