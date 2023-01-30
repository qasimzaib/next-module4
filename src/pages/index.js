import { getFeaturedEvents } from "dummy-data";
import EventList from "@/components/events/EventList";

export default function HomePage() {
	const featuredEvents = getFeaturedEvents();
	console.log("featuredEvents", featuredEvents);
	
	return (
		<div>
			<h1>Home Page</h1>
			<EventList items={featuredEvents} />
		</div>
	);
}
