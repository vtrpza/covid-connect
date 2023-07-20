import { useState, useEffect } from "react";
import axios from "axios";

const useFilterData = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorInput, setErrorInput] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/all")
      .then((response) => {
        setFilteredData(response.data);
      })
      .catch(() => setError(true));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setErrorInput(false);
  };

  const handleOnClickSearch = () => {
    if (searchTerm.trim() !== "") {
      axios
        .get(`https://disease.sh/v3/covid-19/countries/${searchTerm}`)
        .then((response) => setFilteredData(response.data))
        .catch(() => setErrorInput(true));
    } else {
      setErrorInput(true);
    }
  };

  return [
    searchTerm,
    setSearchTerm,
    handleSearch,
    handleOnClickSearch,
    filteredData,
    errorInput,
    error,
  ];
};

export default useFilterData;
