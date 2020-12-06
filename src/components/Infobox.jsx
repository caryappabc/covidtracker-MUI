import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function Infobox({ title, cases, total }) {
	return (
		<div>
			<Card>
				<CardContent>
					<Typography color="testPrimary">{title}</Typography>
					<h2>{cases}</h2>
					<Typography color="testPrimary">{total} Total</Typography>
				</CardContent>
			</Card>
		</div>
	);
}

export default Infobox;
