module.exports = {
  moduleNameMapper: {
    "^app/schedule-app/utils": "<rootDir>/src/utils",
  },
  automock: false,
  clearMocks: true,
  coverageDirectory: "coverage",
  "transform": {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
};
