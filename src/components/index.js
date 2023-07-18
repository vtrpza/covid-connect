import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CircularProgress,
  Divider,
  InputBase,
  Typography,
  Alert,
  styled,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Charts from "./Charts";
import { styled as muiStyled } from "@mui/system";

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
  const [globalData, setGlobalData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);

  const handleOnClickSearch = () => {
    if (!searchTerm) return;
    axios
      .get(`https://disease.sh/v3/covid-19/countries/${searchTerm}`)
      .then((response) => {
        setFilteredData(response.data);
        setError(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setFilteredData(null);
        setError(true);
      });
  };

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/all")
      .then((response) => {
        setGlobalData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(true);
      });
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(globalData);
    }
  }, [searchTerm, globalData]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
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

        <ResponsiveBox>
          <InputBase
            placeholder="Search by country"
            value={searchTerm}
            onChange={handleSearch}
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
            endAdornment={
              <InputAdornment
                onClick={handleOnClickSearch}
                sx={{
                  cursor: "pointer",
                }}
                position="end"
              >
                <SearchIcon />
              </InputAdornment>
            }
          />
        </ResponsiveBox>

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

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "1rem",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Charts data={formattedData} />
        </Box>
      </ResponsiveCard>
    </Box>
  );
};

export default CovidTracker;
