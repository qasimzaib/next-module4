import { getAllEvents } from "dummy-data";
import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import { useRouter } from "next/router";

export default function EventsPage() {
	const router = useRouter();
	const events = getAllEvents();

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
