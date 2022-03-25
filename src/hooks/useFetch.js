import { useEffect, useState } from "react";

export const useFetch = url => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async url => {
      try {
        const response = await fetch(url, {
          method: "GET",
          header: { "Access-Control-Allow-Origin": "*" },
        });
        setData(await response.json());
      } catch (e) {
        console.log(e);
        new Error("오류가 발생했습니다.");
      }
    };

    fetchData(url);
  }, []);

  return data;
};
