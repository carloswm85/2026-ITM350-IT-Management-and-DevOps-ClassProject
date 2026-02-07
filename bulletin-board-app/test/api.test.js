const api = require("../backend/api.js");
const events = require("../backend/events.js");

describe("api.js handlers", () => {
	test("events() returns all events", () => {
		const req = {};
		const res = { json: jest.fn() };

		api.events(req, res);

		expect(res.json).toHaveBeenCalledWith(events);
	});

	test("event() returns single event by id", () => {
		const req = {
			params: {
				eventId: 0,
			},
		};

		const res = { json: jest.fn() };

		api.event(req, res);

		expect(res.json).toHaveBeenCalledWith(events[0]);
	});
});
