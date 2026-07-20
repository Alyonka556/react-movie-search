import { useEffect, useState } from 'react';
// import { fetchMoviesId } from 'services/movies-api';

export const useHttp = (fetchFn, params) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!params) {
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchFn(params);

        if (isMounted) {
          setData(result);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message || 'Something went wrong.');
          setData(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchFn, params]);

  return { data, error, isLoading };
  // useEffect(() => {
  //   if (params) {
  //     fetchFn(params)
  //       .then(data => setData(data))
  //       .catch(error => {
  //         setError(error.message);
  //         setData([]);
  //       });
  //   }
  // }, [params, fetchFn]);

  // return [data, setData, error];
};
