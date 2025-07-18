import { useState } from "react";
import BASE_URL from "Utilities/BASE_URL";

const usePostDataTokenForm = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (url, data, token) => {
    setLoading(true);
    setError(null);
    try {
      // Convert data object to FormData
      const formData = new FormData();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          formData.append(key, data[key]);
        }
      }

      const res = await fetch(`${BASE_URL}/${url}`, {
        method: "POST",
        headers: {
          // Do not set Content-Type for FormData
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Send as FormData
      });

      console.log(res);

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

export default usePostDataTokenForm;
