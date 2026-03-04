const { createMethods, createHttpAdapter, initVueApp } = require("../app");

describe("Vue methods", () => {
	let methods;
	let http;
	let vm;

	beforeEach(() => {
		http = {
			get: jest.fn().mockResolvedValue([{ id: 1, title: "Test" }]),
			post: jest.fn().mockResolvedValue({}),
			delete: jest.fn().mockResolvedValue({}),
		};

		methods = createMethods(http, () => true);

		vm = {
			event: { title: "Event 1", detail: "", date: "" },
			events: [],
			...methods,
		};
	});

	describe("fetchEvents", () => {
		test("loads events successfully", async () => {
			const res = await vm.fetchEvents();
			expect(res.length).toBe(1);
			expect(vm.events.length).toBe(1);
			expect(vm.events[0].title).toBe("Test");
		});

		test("handles http error", async () => {
			const httpFail = {
				get: jest.fn().mockRejectedValue("network error"),
			};

			const methods = createMethods(httpFail);
			const vm = { events: [], ...methods };

			const res = await vm.fetchEvents();
			expect(res).toBe("network error");
			expect(vm.events.length).toBe(0);
		});

		test("updates events array with fetched data", async () => {
			const multipleEvents = [
				{ id: 1, title: "Event 1" },
				{ id: 2, title: "Event 2" },
			];
			http.get.mockResolvedValue(multipleEvents);

			await vm.fetchEvents();
			expect(vm.events).toEqual(multipleEvents);
		});
	});

	describe("addEvent", () => {
		test("adds event successfully", async () => {
			const result = await vm.addEvent();
			expect(result).toBe(true);
			expect(vm.events.length).toBe(1);
			expect(http.post).toHaveBeenCalledWith("/api/events", vm.event);
		});

		test("fails with empty title", async () => {
			vm.event.title = "";
			const result = await vm.addEvent();
			expect(result).toBe(false);
			expect(vm.events.length).toBe(0);
		});

		test("fails with whitespace-only title", async () => {
			vm.event.title = "   ";
			const result = await vm.addEvent();
			expect(result).toBe(false);
			expect(vm.events.length).toBe(0);
		});

		test("handles http error", async () => {
			const httpFail = {
				post: jest.fn().mockRejectedValue("server error"),
			};

			const methods = createMethods(httpFail);
			const vm = {
				event: { title: "Test" },
				events: [],
				...methods,
			};

			const res = await vm.addEvent();
			expect(res).toBe("server error");
			expect(vm.events.length).toBe(0);
		});

		test("adds event with all fields", async () => {
			vm.event = {
				title: "Conference",
				detail: "Annual tech conference",
				date: "2024-12-01",
			};

			await vm.addEvent();
			expect(vm.events[0]).toEqual(vm.event);
		});
	});

	describe("deleteEvent", () => {
		test("removes event successfully", async () => {
			vm.events = [{ id: 5, title: "Delete me" }];
			const result = await vm.deleteEvent(5);
			expect(result).toBe(true);
			expect(vm.events.length).toBe(0);
		});

		test("cancels when confirm is false", async () => {
			const methods = createMethods(http, () => false);

			const vm = {
				event: { title: "X" },
				events: [{ id: 1, title: "Event" }],
				...methods,
			};

			const result = await vm.deleteEvent(1);
			expect(result).toBe(false);
			expect(vm.events.length).toBe(1);
			expect(http.delete).not.toHaveBeenCalled();
		});

		test("does nothing if event not found", async () => {
			vm.events = [{ id: 2, title: "Event" }];

			const result = await vm.deleteEvent(99);
			expect(result).toBe(true);
			expect(vm.events.length).toBe(1);
		});

		test("handles http error", async () => {
			const httpFail = {
				delete: jest.fn().mockRejectedValue("delete failed"),
			};

			const methods = createMethods(httpFail, () => true);
			const vm = {
				events: [{ id: 1, title: "Event" }],
				...methods,
			};

			const res = await vm.deleteEvent(1);
			expect(res).toBe("delete failed");
			expect(vm.events.length).toBe(1);
		});

		test("removes correct event from multiple events", async () => {
			vm.events = [
				{ id: 1, title: "Event 1" },
				{ id: 2, title: "Event 2" },
				{ id: 3, title: "Event 3" },
			];

			await vm.deleteEvent(2);
			expect(vm.events.length).toBe(2);

			// Use map to get IDs instead of find() to avoid deprecation warning
			const remainingIds = vm.events.map((e) => e.id);
			expect(remainingIds).toContain(1);
			expect(remainingIds).toContain(3);
			expect(remainingIds).not.toContain(2);
		});
	});

	describe("createMethods with defaults", () => {
		test("uses default confirm function when not provided", () => {
			const methods = createMethods(http);
			expect(methods).toHaveProperty("fetchEvents");
			expect(methods).toHaveProperty("addEvent");
			expect(methods).toHaveProperty("deleteEvent");
		});
	});
});

describe("createHttpAdapter", () => {
	let mockVueHttp;
	let adapter;

	beforeEach(() => {
		mockVueHttp = {
			get: jest.fn(),
			post: jest.fn(),
			delete: jest.fn(),
		};
		adapter = createHttpAdapter(mockVueHttp);
	});

	test("get method wraps Vue http get", async () => {
		const mockData = [{ id: 1, title: "Event" }];
		mockVueHttp.get.mockResolvedValue({ data: mockData });

		const result = await adapter.get("/api/events");
		expect(result).toEqual(mockData);
		expect(mockVueHttp.get).toHaveBeenCalledWith("/api/events");
	});

	test("get method handles errors", async () => {
		const error = new Error("Network error");
		mockVueHttp.get.mockRejectedValue(error);

		await expect(adapter.get("/api/events")).rejects.toThrow("Network error");
	});

	test("post method wraps Vue http post", async () => {
		const eventData = { title: "New Event" };
		mockVueHttp.post.mockResolvedValue({ data: { success: true } });

		const result = await adapter.post("/api/events", eventData);
		expect(result).toEqual({ success: true });
		expect(mockVueHttp.post).toHaveBeenCalledWith("/api/events", eventData);
	});

	test("post method handles errors", async () => {
		const error = new Error("Server error");
		mockVueHttp.post.mockRejectedValue(error);

		await expect(adapter.post("/api/events", {})).rejects.toThrow(
			"Server error",
		);
	});

	test("delete method wraps Vue http delete", async () => {
		mockVueHttp.delete.mockResolvedValue({ data: { deleted: true } });

		const result = await adapter.delete("/api/events/1");
		expect(result).toEqual({ deleted: true });
		expect(mockVueHttp.delete).toHaveBeenCalledWith("/api/events/1");
	});

	test("delete method handles errors", async () => {
		const error = new Error("Delete failed");
		mockVueHttp.delete.mockRejectedValue(error);

		await expect(adapter.delete("/api/events/1")).rejects.toThrow(
			"Delete failed",
		);
	});
});

describe("initVueApp", () => {
	let mockVue;
	let mockConfirm;
	let vueInstance;

	beforeEach(() => {
		mockConfirm = jest.fn().mockReturnValue(true);

		mockVue = jest.fn(function (config) {
			this.config = config;
			this.$data = config.data;

			// Bind methods to this instance
			if (config.methods) {
				Object.keys(config.methods).forEach((key) => {
					this[key] = config.methods[key].bind(this);
				});
			}

			// Initialize data properties
			this.event = config.data.event;
			this.events = config.data.events;

			// Simulate calling ready
			if (config.ready) {
				config.ready.call(this);
			}

			return this;
		});

		mockVue.http = {
			get: jest.fn().mockResolvedValue({ data: [] }),
			post: jest.fn().mockResolvedValue({ data: {} }),
			delete: jest.fn().mockResolvedValue({ data: {} }),
		};

		vueInstance = initVueApp(mockVue, mockConfirm);
	});

	test("creates Vue instance with correct config", () => {
		expect(mockVue).toHaveBeenCalled();
		expect(vueInstance.config.el).toBe("#events");
	});

	test("initializes with correct data structure", () => {
		expect(vueInstance.config.data).toEqual({
			event: { title: "", detail: "", date: "" },
			events: [],
		});
	});

	test("includes all required methods", () => {
		expect(vueInstance.config.methods).toHaveProperty("fetchEvents");
		expect(vueInstance.config.methods).toHaveProperty("addEvent");
		expect(vueInstance.config.methods).toHaveProperty("deleteEvent");
	});

	test("calls fetchEvents on ready", () => {
		expect(mockVue.http.get).toHaveBeenCalledWith("/api/events");
	});

	test("returns Vue instance", () => {
		expect(vueInstance).toBeDefined();
		expect(vueInstance.config).toBeDefined();
	});
});
