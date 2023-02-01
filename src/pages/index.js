import EventList from "@/components/events/EventList";
import { getFeaturedEvents } from "@/helpers/api-utils";
import Head from "next/head";

export default function HomePage(props) {
	return (
		<div>
			<Head>
				<title>NextJS</title>
				<meta name="description" content="NestJS Tutorial Application" />
			</Head>
			<EventList items={props.events} />
		</div>
	);
}

export async function getStaticProps() {
	const featuredEvents = await getFeaturedEvents();

	return {
		props: {
			events: featuredEvents,
		},
		revalidate: 1800,
	};
}
