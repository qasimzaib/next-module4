import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import { getAllEvents } from "@/helpers/api-utils";
import { useRouter } from "next/router";

export default function EventsPage(props) {
	const router = useRouter();

	const { events } = props;
	function searchHandler(year, month) {
		const path = `/events/${year}/${month}`;
		router.push(path);
	}

	return (
		<div>
			<EventsSearch onSearch={searchHandler} />
			<EventList items={events} />
		</div>
	);
}

export async function getStaticProps() {
	const events = await getAllEvents();

	return {
		props: {
			events: events,
		},
		revalidate: 1800,
	};
}
