export const fetchData = async (query) => {
    try {
      let res = await fetch(query, { cache: 'no-cache' });
      
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      let data = await res.json();
      
      return data.result;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error after logging it
    }
  };
  