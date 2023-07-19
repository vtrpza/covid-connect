import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, Select, MenuItem } from "@mui/material";

const HistoricalDataChart = ({
  data,
  selectedDataKey,
  setSelectedDataKey,
  selectedCountry,
  setSelectedCountry,
  selectedTimeFrame,
  setSelectedTimeFrame,
}) => {
  const handleDataKeyChange = (event) => {
    setSelectedDataKey(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleTimeFrameChange = (event) => {
    setSelectedTimeFrame(event.target.value);
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
          width: "100%",
        }}
      >
        <Select value={selectedCountry} onChange={handleCountryChange}>
          {countries.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>

        <Select value={selectedDataKey} onChange={handleDataKeyChange}>
          <MenuItem value="cases">Cases</MenuItem>
          <MenuItem value="deaths">Deaths</MenuItem>
        </Select>

        <Select value={selectedTimeFrame} onChange={handleTimeFrameChange}>
          <MenuItem value="30">Last 30 days</MenuItem>
          <MenuItem value="90">Last 90 days</MenuItem>
          <MenuItem value="365">Last 365 days</MenuItem>
        </Select>
      </Box>

      <Box
        sx={{
          width: 700,
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis width={100} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={selectedDataKey} stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default HistoricalDataChart;
