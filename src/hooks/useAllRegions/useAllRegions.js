import { useEffect, useState } from 'react';
import { getAllRegions } from 'lib/regions';

const useAllRegions = (options) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchingAllRegions = async () => {
    setLoading(true);
    try {
      const data = await getAllRegions(options);
      setData(data.regions);
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchingAllRegions();
  }, []);

  return {
    data,
    loading,
    error,
  };
};
export default useAllRegions;
