import React, { useState, useEffect } from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";
import { useLocation, useParams, useHistory } from "react-router-dom";

export default () => {
  const location = useLocation();
  const { pathname } = location;
  const [result, setResult] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const isMovie = useState(pathname.includes("/movie/"))[0];
  let { id } = useParams();
  const history = useHistory();
  const { push } = history;

  useEffect(() => {
    const fetchDetail = async () => {
      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        return push("/");
      }
      let result = null;
      try {
        if (isMovie) {
          ({ data: result } = await moviesApi.movieDetail(parsedId));
        } else {
          ({ data: result } = await tvApi.showDetail(parsedId));
        }
      } catch {
        setError("Can't find anything");
      } finally {
        setResult(result);
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id, isMovie, push]);

  return <DetailPresenter result={result} error={error} loading={loading} />;
};
