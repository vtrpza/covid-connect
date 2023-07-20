import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CircularProgress,
  Divider,
  Typography,
  Alert,
  Tabs,
  Tab,
  styled,
  TextField,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { styled as muiStyled } from "@mui/system";
import HistoricalDataChart from "./HistoricalDataChart";
import LineChartComponent from "./LineChart";
import useFilterData from "../utils/useFilterData";
import useHistoricalData from "../utils/useHistoricalData";

const ResponsiveCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  justifyContent: "center",
  padding: "1rem",
  [theme.breakpoints.up("sm")]: {
    width: "520px",
  },
  [theme.breakpoints.up("md")]: {
    width: "720px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "920px",
  },
}));

const ResponsiveBox = muiStyled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  padding: ".5rem",
  justifyContent: "space-between",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "600px",
    margin: "0 auto",
  },
}));

const CovidTracker = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedDataKey, setSelectedDataKey] = useState("cases");
  const [selectedCountry, setSelectedCountry] = useState("USA");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("30");
  const [
    searchTerm,
    setSearchTerm,
    handleSearch,
    handleOnClickSearch,
    filteredData,
    errorInput,
    error,
  ] = useFilterData();

  const historicalData = useHistoricalData(searchTerm, selectedTimeFrame);

  useEffect(() => {
    setSearchTerm("");
  }, [tabValue, setSearchTerm]);

  const formatHistoricalData = (data) => {
    let formattedHistoricalData = [];

    if (data && data.length) {
      for (let i = 0; i < data.length; i++) {
        const { timeline, country } = data[i];

        if (timeline) {
          const { cases, deaths, recovered } = timeline;
          for (let date in cases) {
            formattedHistoricalData.push({
              country,
              date,
              cases: cases[date],
              deaths: deaths[date],
            });
          }
        }
      }
    }
    return formattedHistoricalData;
  };

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          height: "100vh",
          width: "100%",
        }}
      >
        <Alert severity="error">
          Error fetching data. Please try again later.
        </Alert>
      </Box>
    );
  }

  if (!filteredData) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          height: "100vh",
          width: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const formattedData = [
    { label: "Active", value: filteredData.active },
    { label: "Cases", value: filteredData.cases },
    { label: "Critical", value: filteredData.critical },
    { label: "Deaths", value: filteredData.deaths },
    { label: "Recovered", value: filteredData.recovered },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <ResponsiveCard>
        <Typography gutterBottom variant="h4">
          Global COVID-19 Statistics
        </Typography>

        <Divider />

        <Tabs
          value={tabValue}
          onChange={(event, newValue) => setTabValue(newValue)}
        >
          <Tab label="Current Statistics" />
          <Tab label="Historical Data" />
        </Tabs>

        {tabValue === 0 && (
          <ResponsiveBox>
            <TextField
              error={errorInput}
              placeholder="Search by country"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <SearchIcon
                      sx={{ cursor: "pointer" }}
                      onClick={handleOnClickSearch}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
                padding: "0.5rem",
                width: "100%",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
                "& .MuiInputBase-input": {
                  fontSize: "1rem",
                  fontWeight: "500",
                },
                "& .MuiInputAdornment-root": {
                  marginLeft: "0.5rem",
                },
              }}
            />
          </ResponsiveBox>
        )}

        {tabValue === 0 && (
          <ResponsiveBox>
            {filteredData && (
              <>
                <Typography variant="h6">
                  Total Cases: {filteredData.cases.toLocaleString()}
                </Typography>
                <Typography variant="h6">
                  Total Deaths: {filteredData.deaths.toLocaleString()}
                </Typography>
                <Typography variant="h6">
                  Total Recovered: {filteredData.recovered.toLocaleString()}
                </Typography>
              </>
            )}
          </ResponsiveBox>
        )}

        {tabValue === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "1rem",
              width: 700,
              justifyContent: "center",
            }}
          >
            <LineChartComponent data={formattedData} />
          </Box>
        )}
        {tabValue === 1 && historicalData && (
          <HistoricalDataChart
            data={formatHistoricalData(historicalData)}
            selectedDataKey={selectedDataKey}
            setSelectedDataKey={setSelectedDataKey}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedTimeFrame={selectedTimeFrame}
            setSelectedTimeFrame={setSelectedTimeFrame}
          />
        )}
      </ResponsiveCard>
    </Box>
  );
};

export default CovidTracker;
