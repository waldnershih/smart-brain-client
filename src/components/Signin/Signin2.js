import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Grid, Paper, TextField } from "@mui/material";

const initialValues = {
	email: "",
	password: "",
};

const CustomisedTextField = styled(TextField)(({ theme }) => ({
	width: "80%",
	// height: "100%",
	margin: theme.spacing(1.5),
}));

export default function BasicGrid() {
	const [values, setValues] = useState(initialValues);

	return (
		<form className="form">
			<CustomisedTextField
				label="Email"
				variant="outlined"
				value={values.email}
				onChange={(e) =>
					setValues({ ...values, email: e.target.value })
				}
			/>
			<CustomisedTextField
				label="Password"
				variant="outlined"
				value={values.password}
				onChange={(e) =>
					setValues({ ...values, password: e.target.value })
				}
			/>
		</form>
	);
}
