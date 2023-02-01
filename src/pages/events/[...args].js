import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/events/ResultsTitle";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/ErrorAlert";
import { getFilteredEvents } from "@/helpers/api-utils";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";

export default function FilteredEventsPage(props) {
	const router = useRouter();
	const [events, setEvents] = useState();

	const filterData = router.query.args;

	const fetcher = (url) => fetch(url).then((res) => res.json());
	const { data, error } = useSWR(
		"https://nextjs-course-190f0-default-rtdb.firebaseio.com/events.json",
		fetcher
	);

	useEffect(() => {
		if (data) {
			const events = [];

			for (const key in data) {
				events.push({
					id: key,
					...data[key],
				});
			}

			setEvents(events);
		}
	}, [data]);

	if (!events) {
		return <p className="center">Loading...</p>;
	}

	const selectedYear = filterData[0];
	const selectedMonth = filterData[1];
	const numSelectedYear = +selectedYear;
	const numSelectedMonth = +selectedMonth;

	if (
		isNaN(numSelectedYear) ||
		isNaN(numSelectedMonth) ||
		numSelectedYear > 2030 ||
		numSelectedYear < 2020 ||
		numSelectedMonth < 1 ||
		numSelectedMonth > 12
	) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>Invalid Search</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Go Back</Button>
				</div>
			</Fragment>
		);
	}

	const filteredEvents = events.filter((event) => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === numSelectedYear &&
			eventDate.getMonth() === numSelectedMonth - 1
		);
	});

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>No events found</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const date = new Date(numSelectedYear, numSelectedMonth - 1);

	return (
		<Fragment>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</Fragment>
	);
}

// export async function getServerSideProps(context) {
// 	const { params } = context;

// 	const filterData = params.args;

// 	const selectedYear = filterData[0];
// 	const selectedMonth = filterData[1];
// 	const numSelectedYear = +selectedYear;
// 	const numSelectedMonth = +selectedMonth;

// 	if (
// 		isNaN(numSelectedYear) ||
// 		isNaN(numSelectedMonth) ||
// 		numSelectedYear > 2030 ||
// 		numSelectedYear < 2020 ||
// 		numSelectedMonth < 1 ||
// 		numSelectedMonth > 12 || error
// 	) {
// 		return {
// 			props: {
// 				error: true,
// 			},
// 		};
// 	}

// 	const filteredEvents = await getFilteredEvents({
// 		year: numSelectedYear,
// 		month: numSelectedMonth,
// 	});

// 	return {
// 		props: {
// 			events: filteredEvents,
// 			date: {
// 				year: numSelectedYear,
// 				month: numSelectedMonth,
// 			},
// 		},
// 	};
// }
