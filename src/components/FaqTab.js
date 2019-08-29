import React from "react";
import {
	Container,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	Link,
	useMediaQuery
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import StyledContainer from "./StyledContainer";

export default function FaqTab() {
	const theme = useTheme();
	const fullscreen = useMediaQuery(theme.breakpoints.down("xs"));

	return (
		<StyledContainer title="FAQs">
			<Container maxWidth="md">
				<List>
					{faqs.map((faq, i) => (
						<ListItem
							key={faq.q}
							divider={faqs.length - 1 !== i}
							alignItems="center"
						>
							{!fullscreen && (
								<ListItemAvatar>
									<Avatar>{i + 1}</Avatar>
								</ListItemAvatar>
							)}
							<ListItemText primary={faq.q} secondary={faq.a} />
						</ListItem>
					))}
				</List>
			</Container>
		</StyledContainer>
	);
}

const faqs = [
	{
		q: "What are some limitations I should expect?",
		a:
			"When you create a playlist, it will only search the last 48 hours. When you update a playlist, it will search as far back as the last update, but will only add 25 videos max."
	},
	{
		q: "Why can’t I view my playlists?",
		a:
			"Either you aren't signed in or you don't have any playlists created. If you think that's wrong double check on your YouTube."
	},
	{
		q: "Why can’t I access the TV tab?",
		a:
			"The player needs to know what you want to watch. Choose a playlist to get started first."
	},
	{
		q: "Why can’t I update a playlist more than once every 24 hours?",
		a:
			"uTubeFiltered was created as a productivity tool to reduce your time interacting on YouTube. Consequently, I deemed once a day enough time to catch up on videos that interested me."
	},
	{
		q: "Why can’t I update a playlist?",
		a:
			"If your playlist wasn't created with uTubeFiltered, we won't know what to search for. If it was, refer to the question above."
	},
	{
		q: "Where are all my playlist options stored?",
		a:
			"Everything is saved within your created YouTube playlist. The info is kept in the playlist tags, so there aren't any extra backend servers to interact with."
	},
	{
		q: "I deleted a playlist by accident. Can I get it back?",
		a: "Nope, sorry. You’ll need to create another one."
	},
	{
		q: "A video deleted itself automatically, how do I get it back?",
		a:
			"Unfortunately, you can't here. However, you can go to YouTube and manually insert that video back into its respective playlist if you truly want it."
	},
	{
		q: "How do I increase the number of updates per day?",
		a:
			"If you’re a developer, you can clone this public repo, insert your own API keys, change that variable and deploy it. Let me know if you need help with that."
	},
	{
		q: "Why was the daily quota reached?",
		a:
			"It's unfortunate, but Google doesn't provide a large limit for apps created with their platform sometimes."
	},
	{
		q: "Can I increase the quota?",
		a:
			"Although it's possible, it's unlikely. However, you can clone this app and use your own quota."
	},
	{
		q: "Can I see the source code?",
		a: (
			<Link
				href="https://github.com/dastrong/uTubeFiltered"
				target="_blank"
				rel="noopener noreferrer"
			>
				Sure.
			</Link>
		)
	}
];
