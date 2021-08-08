import { useState, useEffect, useCallback } from "react";
import axios from "../api/config";

const useAxios = ({ url, method, body = null }, autoCallApi = true) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    (newBody) => {
      setLoading(true);
      axios[method](url, newBody)
        .then((res) => {
          const { status, data } = res;
          const { message = "" } = data;

          if (status === 200 || status === 201) {
            setResponse(res.data);
          } else {
            throw new Error(message);
          }
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [method, url]
  );

  useEffect(() => {
    if (autoCallApi) fetchData(body);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoCallApi, fetchData]);

  return { response, error, loading, fetchData };
};

export default useAxios;
