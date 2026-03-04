/**
 * Create testable methods for Vue instance
 * @param {Object} http - HTTP client (Vue's $http or mock)
 * @param {Function} confirmFn - Confirmation function (window.confirm or mock)
 * @returns {Object} Methods object
 */
function createMethods(
	http,
	confirmFn = typeof confirm !== "undefined" ? confirm : () => true,
) {
	return {
		fetchEvents: async function () {
			try {
				const events = await http.get("/api/events");
				this.events = events;
				console.log(events);
				return events;
			} catch (err) {
				console.log(err);
				return err;
			}
		},

		addEvent: async function () {
			if (!this.event.title.trim()) {
				return false;
			}

			try {
				await http.post("/api/events", this.event);
				this.events.push(this.event);
				console.log("Event added!");
				return true;
			} catch (err) {
				console.log(err);
				return err;
			}
		},

		deleteEvent: async function (id) {
			if (!confirmFn("Are you sure you want to delete this event?")) {
				return false;
			}

			try {
				await http.delete("api/events/" + id);
				const index = this.events.findIndex((x) => x.id === id);
				if (index !== -1) {
					this.events.splice(index, 1);
				}
				return true;
			} catch (err) {
				console.log(err);
				return err;
			}
		},
	};
}

/**
 * Create HTTP adapter for Vue's $http
 * @param {Object} VueHttp - Vue's http object
 * @returns {Object} HTTP adapter
 */
function createHttpAdapter(VueHttp) {
	return {
		get: function (url) {
			return new Promise((resolve, reject) => {
				VueHttp.get(url)
					.then((response) => resolve(response.data))
					.catch(reject);
			});
		},
		post: function (url, data) {
			return new Promise((resolve, reject) => {
				VueHttp.post(url, data)
					.then((response) => resolve(response.data))
					.catch(reject);
			});
		},
		delete: function (url) {
			return new Promise((resolve, reject) => {
				VueHttp.delete(url)
					.then((response) => resolve(response.data))
					.catch(reject);
			});
		},
	};
}

/**
 * Initialize Vue instance
 * @param {Object} VueConstructor - Vue constructor
 * @param {Function} confirmFn - Confirmation function
 */
function initVueApp(VueConstructor, confirmFn) {
	return new VueConstructor({
		el: "#events",

		data: {
			event: { title: "", detail: "", date: "" },
			events: [],
		},

		ready: function () {
			this.fetchEvents();
		},

		methods: createMethods(createHttpAdapter(VueConstructor.http), confirmFn),
	});
}

// Browser environment - initialize Vue
/* istanbul ignore next */
if (typeof Vue !== "undefined") {
	initVueApp(Vue, typeof confirm !== "undefined" ? confirm : undefined);
}

// Export for testing
if (typeof module !== "undefined" && module.exports) {
	module.exports = { createMethods, createHttpAdapter, initVueApp };
}
