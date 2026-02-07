const express = require("express");
const request = require("supertest");
const api = require("../backend/api");
const events = require("../backend/events");

describe("API routes", () => {
	let app;

	beforeEach(() => {
		app = express();

		app.get("/api/events", api.events);
		app.get("/api/events/:eventId", (req, res) => {
			// adapt param shape to match api.js
			req.param = { eventId: req.params.eventId };
			api.event(req, res);
		});
	});

	test("GET /api/events", async () => {
		const res = await request(app).get("/api/events");

		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual(events);
	});

	test("GET /api/events/:eventId", async () => {
		const res = await request(app).get("/api/events/0");

		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual(events[0]);
	});
});
