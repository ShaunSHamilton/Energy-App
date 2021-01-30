test("environment has been set to production", () => {
  expect(process.env.REACT_APP_MODE).toEqual("production");
});
