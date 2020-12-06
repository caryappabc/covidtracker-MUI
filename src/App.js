import React, { useState, useEffect } from "react";
import {
	MenuItem,
	FormControl,
	Select,
	Card,
	CardContent,
} from "@material-ui/core";
import InfoBox from "./components/Infobox";
import Map from "./components/Map";
import "./App.css";

function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState("worldwide");

	//useEffect - runs a peice of code based on a certain condition , ie when certain defined update occurs and can be config for each updates.

	useEffect(() => {
		// code in her will runs once the component loads.
		// async - send a req , waits , and does something.
		const getCountriesData = async () => {
			await fetch("https://disease.sh/v3/covid-19/countries")
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((country) => ({
						name: country.country,
						value: country.countryInfo.iso2,
					}));
					setCountries(countries);
				});
		};
		getCountriesData();
	}, []);

	const onCountryChange = async (event) => {
		setCountry(event.target.value);
	};

	return (
		<div className="app">
			<div className="app__left">
				<div className="app__header">
					<h1>COVID-19 Tracker</h1>
					<FormControl className="app__dropdown">
						<Select
							varient="outlined"
							onChange={onCountryChange}
							value={country}
						>
							{/*loop through all the countries and make a list of countrties */}
							<MenuItem value="worldwide">Worldwide</MenuItem>
							{countries.map((country) => (
								<MenuItem value={country.value}>{country.name}</MenuItem>
							))}

							{/*<MenuItem value="wordwide">Wordwide</MenuItem>
							<MenuItem value="wordwide">fdsaf</MenuItem>
							<MenuItem value="wordwide">fsdfsfsd</MenuItem>
							<MenuItem value="wordwide">Wosdfsd</MenuItem>*/}
						</Select>
					</FormControl>
				</div>
				<div className="app__stats">
					<InfoBox title="Infected Personal" cases="1345" total="1111" />
					<InfoBox title="Recovered" cases="1345" total="1111" />
					<InfoBox title="Deaths" cases="1345" total="1111" />
				</div>

				<Map />
				{/* Map */}
			</div>
			<Card className="app_right">
				<CardContent>
					<h3>Live Cases per country</h3>
					<h3>New Cases wordwide</h3>
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
