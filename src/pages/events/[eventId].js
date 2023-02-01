import EventSummary from "@/components/eventDetail/EventSummary";
import EventLogistics from "@/components/eventDetail/EventLogistics";
import EventContent from "@/components/eventDetail/EventContent";
import ErrorAlert from "@/components/ui/ErrorAlert";
import { Fragment } from "react";
import { getAllEvents, getEventById } from "@/helpers/api-utils";

export default function EventDetailPage(props) {
	const event = props.event;

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

export async function getStaticProps(context) {
	const eventId = context.params.eventId;

	const event = await getEventById(eventId);

	return {
		props: {
			event: event,
		},
	};
}

export async function getStaticPaths() {
	const events = await getAllEvents();
	const paths = events.map((event) => ({
		params: {
			eventId: event.id,
		},
	}));

	return {
		paths: paths,
		fallback: false,
	};
}
