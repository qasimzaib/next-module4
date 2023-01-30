import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/events/ResultsTitle";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/ErrorAlert";
import { getFilteredEvents } from "dummy-data";
import { useRouter } from "next/router";
import { Fragment } from "react";

export default function FilteredEventsPage() {
	const router = useRouter();
	const filterData = router.query.args;

	if (!filterData) {
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

	const filteredEvents = getFilteredEvents({
		year: numSelectedYear,
		month: numSelectedMonth,
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
