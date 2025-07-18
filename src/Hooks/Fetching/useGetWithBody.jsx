import { useState } from "react";
import BASE_URL from "Utilities/BASE_URL.js";

/**
 * Custom hook for making GET requests with a body payload
 * This is an unusual pattern but needed for certain API endpoints
 */
const useGetWithBody = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Make a GET request with a body payload
   * @param {string} endpoint - API endpoint to call
   * @param {object} body - Body payload to send
   * @param {string} token - Authorization token
   * @returns {Promise<any>} - Response data
   */
  const getWithBody = async (endpoint, body, token) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message || "An error occurred");
      setLoading(false);
      throw err;
    }
  };

  return { getWithBody, loading, error };
};

export default useGetWithBody;
