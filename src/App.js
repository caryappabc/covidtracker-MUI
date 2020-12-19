import React, { useState, useEffect } from "react";
import "./App.css";
import {
	Paper,
	MenuItem,
	FormControl,
	FormControlLabel,
	Select,
	Card,
	CardContent,
	Switch,
} from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import InfoBox from "./components/Infobox";
import PlotGraph from "./components/PlotGraph";
import Table from "./components/Table";
import DrawMap from "./components/DrawMap";
import { sortData, prettyPrintStat } from "./utils";
import numeral from "numeral";
import "leaflet/dist/leaflet.css";
import VaccineInfo from "./components/VaccineInfo";

const App = () => {
	const [darkMode, SetDarkMode] = useState(false);
	const [country, setCountry] = useState("worldwide");
	const [countryInfo, setCountryInfo] = useState({});
	const [countries, setCountries] = useState([]);
	const [DrawMapCountries, setDrawMapCountries] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [casesType, setCasesType] = useState("cases");
	const [DrawMapCenter, setDrawMapCenter] = useState({
		lat: 34.80746,
		lng: -40.4796,
	});
	const [DrawMapZoom, setDrawMapZoom] = useState(3);
	const [Vaccineinfo, setVaccineInfo] = useState({});

	const theme = createMuiTheme({
		palette: {
			type: darkMode ? "dark" : "light",
		},
	});

	useEffect(() => {
		fetch("https://disease.sh/v3/covid-19/all")
			.then((response) => response.json())
			.then((data) => {
				setCountryInfo(data);
			});
	}, []);

	useEffect(() => {
		fetch("https://disease.sh/v3/covid-19/vaccine")
			.then((response) => response.json())
			.then((data) => {
				setVaccineInfo(data);
			});
	}, []);

	useEffect(() => {
		const getCountriesData = async () => {
			fetch("https://disease.sh/v3/covid-19/countries")
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((country) => ({
						name: country.country,
						value: country.countryInfo.iso2,
					}));
					let sortedData = sortData(data);
					setCountries(countries);
					setDrawMapCountries(data);
					setTableData(sortedData);
				});
		};

		getCountriesData();
	}, []);

	console.log(casesType);

	const onCountryChange = async (e) => {
		const countryCode = e.target.value;

		const url =
			countryCode === "worldwide"
				? "https://disease.sh/v3/covid-19/all"
				: `https://disease.sh/v3/covid-19/countries/${countryCode}`;
		await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setCountry(countryCode);
				setCountryInfo(data);
				setDrawMapCenter([data.countryInfo.lat, data.countryInfo.long]);
				setDrawMapZoom(4);
			});
	};

	return (
		<ThemeProvider theme={theme}>
			<Paper className="app">
				<div className="app__left">
					<div className="app__header">
						<h1>COVID-19 Tracker</h1>
						<FormControl className="app__dropdown">
							<FormControlLabel
								control={
									<Switch
										color="default"
										inputProps={{ "aria-label": "checkbox with default color" }}
									/>
								}
								label="Dark Mode"
								checked={darkMode}
								onChange={() => SetDarkMode(!darkMode)}
							/>
							<Select
								variant="outlined"
								value={country}
								onChange={onCountryChange}
							>
								<MenuItem value="worldwide">Worldwide</MenuItem>
								{countries.map((country) => (
									<MenuItem value={country.value}>{country.name}</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					<div className="app__stats">
						<InfoBox
							onClick={(e) => setCasesType("cases")}
							title="Coronavirus Cases"
							isRed
							active={casesType === "cases"}
							cases={prettyPrintStat(countryInfo.todayCases)}
							total={numeral(countryInfo.cases).format("0.0a")}
						/>
						<InfoBox
							onClick={(e) => setCasesType("recovered")}
							title="Recovered"
							active={casesType === "recovered"}
							cases={prettyPrintStat(countryInfo.todayRecovered)}
							total={numeral(countryInfo.recovered).format("0.0a")}
						/>
						<InfoBox
							onClick={(e) => setCasesType("deaths")}
							title="Deaths"
							isRed
							active={casesType === "deaths"}
							cases={prettyPrintStat(countryInfo.todayDeaths)}
							total={numeral(countryInfo.deaths).format("0.0a")}
						/>
					</div>
					<DrawMap
						countries={DrawMapCountries}
						casesType={casesType}
						center={DrawMapCenter}
						zoom={DrawMapZoom}
					/>
					{/* <VaccineInfo details={Vaccineinfo} /> */}
				</div>
				<Card className="app__right">
					<CardContent>
						<div className="app__information">
							<h3>Live Cases by Country</h3>
							<Table countries={tableData} />
							<h3 style={{ padding: "20px 0px 20px" }}>
								New {casesType} Worldwide
							</h3>
							<PlotGraph casesType={casesType} />
						</div>
					</CardContent>
				</Card>
			</Paper>
		</ThemeProvider>
	);
};

export default App;
