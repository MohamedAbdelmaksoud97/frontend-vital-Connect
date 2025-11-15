// src/services/doctorApi.js

const BASE_URL = import.meta.env.VITE_API_BASE;

/**
 * Fetches doctors from the API with optional filters.
 * @param {object} filters - An object of query params (e.g., { name: 'hhaha', city: 'Cairo' })
 * @returns {Promise<Array>} - A promise that resolves to the array of doctor data.
 */
export const getAllDoctors = async (filters = {}) => {
  // 1. Build the query string using URLSearchParams
  const params = new URLSearchParams();

  // Append filters, but only if they have a value
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  const queryString = params.toString();
  const URL = `${BASE_URL}/doctors${queryString ? `?${queryString}` : ""}`;

  try {
    // 2. Make the fetch request
    const response = await fetch(URL);

    // 3. CRITICAL: Check if the response was successful
    // Fetch does NOT throw an error for 4xx/5xx, so we do it ourselves.
    if (!response.ok) {
      // Try to get a JSON error message from the body, otherwise use status
      let errorData = {
        message: `Request failed with status ${response.status}`,
      };
      try {
        errorData = await response.json(); // Your API might send { status, message }
      } catch (e) {
        // Body wasn't JSON, just fall back to the status message
      }
      // This throw is what makes useQuery's `isError` state turn true
      throw new Error(errorData.message || "Failed to fetch data");
    }

    // 4. Parse the successful JSON response
    // This is your { status: 'success', results: ..., data: [...] } object
    const data = await response.json();

    // 5. Return the array of doctors, just like before
    return data.data;
  } catch (error) {
    // This catches network errors (from fetch) OR our manual throw (from !response.ok)
    console.error("Failed to fetch doctors:", error);
    // Re-throw the error so useQuery can handle it
    throw error;
  }
};
