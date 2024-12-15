  
export const fetchProducts = async () => {

    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (err) {
      throw err; // Re-throw the error for handling in the component
    }
  
  
  };
