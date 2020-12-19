import React, { useState, useEffect } from "react";
import "./Vaccine.css";

function VaccineInfo({ details }) {
	const [candidate, setCandidate] = useState({});

	useEffect(() => {
		let ds = details.data.map((d) => ({
			candidate: d.candidate,
		}));
		setCandidate(ds);
	}, []);

	return <div Style="font-size:48px;">historical</div>;
}

export default VaccineInfo;
