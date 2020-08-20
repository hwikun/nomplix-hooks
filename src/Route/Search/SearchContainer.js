import React, { useState } from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "../../api";

const useSearch = () => {
  const [movieResults, setMovieResults] = useState();
  const [tvResults, setTVResults] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm !== "") {
      searchByTerm();
    }
  };

  const updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    setSearchTerm(value);
  };

  const searchByTerm = async () => {
    setLoading(true);
    try {
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);
      setMovieResults(movieResults);
      setTVResults(tvResults);
    } catch {
      setError("Can't find results.");
    } finally {
      setLoading(false);
    }
  };
  return {
    movieResults,
    tvResults,
    searchTerm,
    loading,
    error,
    handleSubmit,
    updateTerm,
  };
};

export default () => {
  const newData = useSearch();
  return <SearchPresenter {...newData} />;
};
