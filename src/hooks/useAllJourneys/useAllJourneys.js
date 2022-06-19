import { useEffect, useState } from 'react';
import { getAllJourneys } from 'lib/journeys';

const useAllJourneys = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchingAllJourneys = async () => {
    setLoading(true);
    try {
      const data = await getAllJourneys({
        queryIncludes: 'archive',
      });
      setData(data.journeys);
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchingAllJourneys();
  }, []);

  return {
    data,
    loading,
    error,
  };
};
export default useAllJourneys;
