import EventSummary from "@/components/eventDetail/EventSummary";
import EventLogistics from "@/components/eventDetail/EventLogistics";
import EventContent from "@/components/eventDetail/EventContent";
import ErrorAlert from "@/components/ui/ErrorAlert";

import { getEventById } from "dummy-data";
import { useRouter } from "next/router";
import { Fragment } from "react";

export default function EventDetailPage() {
	const router = useRouter();

	const eventId = router.query.eventId;
	const event = getEventById(eventId);

	if (!event) {
		return (
			<ErrorAlert>
				<p>No Event Found</p>
			</ErrorAlert>
		);
	}

	return (
		<Fragment>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
		</Fragment>
	);
}
