const request = require("supertest");
const app = require("../server");

describe("Server routes", () => {
	test("GET / should return 200", async () => {
		const res = await request(app).get("/");
		expect(res.statusCode).toBe(200);
	});

	test("GET /non-existing returns 404", async () => {
		const res = await request(app).get("/does-not-exist");
		expect(res.statusCode).toBe(404);
	});

	afterAll((done) => {
		done();
	});
});
