import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Card,
	CardContent,
	Typography,
	Container,
	Grid,
	Icon
} from "@material-ui/core";
import StyledContainer from "./StyledContainer";

const useStyles = makeStyles({
	container: {
		paddingTop: 16
	},
	icon: {
		width: 30,
		textAlign: "center"
	}
});

const Item = ({ divider, title, text, children }) => (
	<ListItem divider={divider}>
		<ListItemIcon>{children}</ListItemIcon>
		<ListItemText primary={title} secondary={text} />
	</ListItem>
);

const Lists = ({ list, iconCX }) => (
	<List>
		<Item title="I'll name the playlist: " text={list[0]} divider>
			<Icon className={clsx(iconCX, "fas fa-signature")} />
		</Item>
		<Item title="It'll search in: " text={list[1]} divider>
			<Icon className={clsx(iconCX, "fas fa-users")} />
		</Item>
		<Item title="It'll search for: " text={list[2]}>
			<Icon className={clsx(iconCX, "fas fa-search")} />
		</Item>
	</List>
);

export default function ExampleTab() {
	const { container, icon } = useStyles();

	return (
		<StyledContainer title="Examples">
			<Container maxWidth="md" className={container}>
				<Grid container justify="center" spacing={2}>
					{examples.map(example => (
						<Grid key={example.title} item xs={12} sm={9} md={6}>
							<Card>
								<CardContent>
									<Typography variant="subtitle1" align="center">
										{example.title}
									</Typography>
									<Lists list={example.list} iconCX={icon} />
									<Typography variant="subtitle2">{example.result}</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
		</StyledContainer>
	);
}

const examples = [
	{
		title: "I like to work to the flow of an actual DJ set.",
		list: ["Study Sets", "Boiler Room", "boiler room dj set"],
		result: "Filters the Boiler Room DJ sets."
	},
	{
		title: "I love watching full game basketball highlights.",
		list: [
			"Raptors Highlights",
			"MLG Highlights",
			"raptors full game highlights"
		],
		result: "Filters all of the Toronto Raptors game highlights."
	},
	{
		title: "I like watching puzzle solving videos.",
		list: ["Solving Puzzles", "Chris Ramsay and Mr.Puzzle", "puzzle"],
		result: "Filters only puzzle videos from two channels."
	},
	{
		title: "I like listening to R&B instrumental.",
		list: [
			"R&B beats",
			"ThaiBeats, GrillaBeats and Beatpulse",
			"R&B type beat"
		],
		result: "Filters those channels R&B beats into one playlist."
	},
	{
		title: "I enjoy staying caught up on NBA news.",
		list: ["The Jump", "ESPN and NBA on ESPN", "the jump"],
		result: "Filters all The Jump videos."
	},
	{
		title: "I'm a big fan of the Hot Ones interviews.",
		list: ["Hot Ones", "First We Feast", "hot ones"],
		result: "Filters all the interviews."
	},
	{
		title: "I like the JRE podcast and MMA.",
		list: ["MMA show", "PowerfulJRE", "mma show"],
		result: "Filters all MMA show uploads."
	}
];
