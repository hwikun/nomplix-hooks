import React, { useState, useEffect } from "react";
import TVPresenter from "./TVPresenter";
import { tvApi } from "../../api";

export default () => {
  const [topRated, setTopRated] = useState();
  const [popular, setPopular] = useState();
  const [airingToday, setAiringToday] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const newData = { topRated, popular, airingToday, loading, error };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { results: topRated },
        } = await tvApi.topRated();
        const {
          data: { results: popular },
        } = await tvApi.popular();
        const {
          data: { results: airingToday },
        } = await tvApi.airingToday();
        setTopRated(topRated);
        setPopular(popular);
        setAiringToday(airingToday);
      } catch {
        setError("Can't find TV information.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return <TVPresenter {...newData} />;
};
