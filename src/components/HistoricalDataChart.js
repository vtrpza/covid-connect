import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Box, Typography, Select, MenuItem } from "@mui/material";

const HistoricalDataChart = ({
  data,
  selectedDataKey,
  setSelectedDataKey,
  selectedCountry,
  setSelectedCountry,
}) => {
  const handleDataKeyChange = (event) => {
    setSelectedDataKey(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const countries = [...new Set(data.map((item) => item.country))];

  const filteredData = data.filter((item) => item.country === selectedCountry);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginRight: "1rem",
            marginTop: "1rem",
          }}
        >
          <Select value={selectedCountry} onChange={handleCountryChange}>
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <Select value={selectedDataKey} onChange={handleDataKeyChange}>
            <MenuItem value="cases">Cases</MenuItem>
            <MenuItem value="deaths">Deaths</MenuItem>
            <MenuItem value="recovered">Recovered</MenuItem>
          </Select>
        </Box>
      </Box>

      <Box
        sx={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}
      >
        <LineChart width={600} height={300} data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={selectedDataKey} stroke="#8884d8" />
        </LineChart>
      </Box>
    </Box>
  );
};

export default HistoricalDataChart;
