import { useEffect, useState } from 'react';
import { getAllBirds } from 'lib/birds';

const useAllBirds = (options) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchingAllBirds = async () => {
    setLoading(true);
    try {
      const data = await getAllBirds(options);
      setData(data.birds);
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchingAllBirds();
  }, []);

  return {
    data,
    loading,
    error,
  };
};
export default useAllBirds;
