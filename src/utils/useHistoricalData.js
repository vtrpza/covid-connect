import { useState, useEffect } from "react";
import axios from "axios";

const useHistoricalData = (country = "all", lastDays = 30) => {
  const [historicalData, setHistoricalData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://disease.sh/v3/covid-19/historical/${country}?lastdays=${lastDays}`
      )
      .then((response) => setHistoricalData(response.data))
      .catch(() => setHistoricalData(null));
  }, [country, lastDays]);

  return historicalData;
};

export default useHistoricalData;
