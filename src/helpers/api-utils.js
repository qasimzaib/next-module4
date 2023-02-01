export async function getFeaturedEvents() {
	const events = await getAllEvents();
  return events.filter((event) => event.isFeatured);
}

export async function getAllEvents() {
	const response = await fetch('https://nextjs-course-190f0-default-rtdb.firebaseio.com/events.json');
	const data = await response.json();

	const events = [];

	for (const key in data) {
		events.push({
			id: key,
			...data[key],
		});
	}

  return events;
}

export function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  let filteredEvents = DUMMY_EVENTS.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}

export async function getEventById(id) {
	const events = await getAllEvents();
  return events.find((event) => event.id === id);
}