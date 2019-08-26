import React from "react";
import { Typography, Container } from "@material-ui/core";
import StyledContainer from "./StyledContainer";

export default function ExampleTab() {
	return (
		<StyledContainer title="Examples">
			<Container maxWidth="md" style={{ paddingTop: "16px" }}>
				<Typography align="center" variant="h6" gutterBottom>
					uTubeFiltered use case examples coming soon
				</Typography>
			</Container>
		</StyledContainer>
	);
}
