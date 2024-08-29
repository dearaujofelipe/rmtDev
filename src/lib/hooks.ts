import { useEffect, useState } from 'react';

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (searchText: string) => {
      if (!searchText) return;

      setIsLoading(true);
      try {
        const res = await fetch(
          `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
        );
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setJobItems(data.jobItems);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData(searchText);

    return () => {
      setIsLoading(false);
    };
  }, [searchText]);

  return {
    jobItems,
    isLoading,
  };
}
