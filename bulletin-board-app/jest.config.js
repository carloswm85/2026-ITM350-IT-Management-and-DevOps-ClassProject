module.exports = {
	testEnvironment: "node",

	// Properly clean up between tests to prevent memory leaks
	resetMocks: true,
	restoreMocks: true,
	clearMocks: true,

	collectCoverage: true,
	collectCoverageFrom: [
		"**/*.js",
		"!**/node_modules/**",
		"!**/coverage/**",
		"!**/test/**",

		// exclude backend (not part of assignment)
		"!**/backend/**",

		// exclude startup-only files
		"!**/server.js",
		"!**/jest.config.js",
	],

	coverageThreshold: {
		global: {
			statements: 80,
			branches: 80,
			functions: 80,
			lines: 80,
		},
	},
};
