import React, { useState, useEffect } from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "../../api";

export default () => {
  const [nowPlaying, setNowPlaying] = useState();
  const [upcoming, setUpcoming] = useState();
  const [popular, setPopular] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { results: nowPlaying },
        } = await moviesApi.nowPlaying();
        const {
          data: { results: upcoming },
        } = await moviesApi.upcoming();
        const {
          data: { results: popular },
        } = await moviesApi.popular();
        setNowPlaying(nowPlaying);
        setUpcoming(upcoming);
        setPopular(popular);
      } catch {
        setError("Can't find movie information");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const newData = { nowPlaying, upcoming, popular, error, loading };
  console.log(newData);
  return <HomePresenter {...newData} />;
};
