const { describe, beforeEach } = require("@jest/globals");
const loggerMiddleware = require("../src/auth/middleware/logger");

describe("logger middleware", () => {
  let consoleSpy;
  let req = {};
  let res = {};
  let next = jest.fn(); // spy on next method

  beforeEach(() => {
    // attach to the consle method
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    // restore console method to it's original state
    consoleSpy.mockRestore();
  });

  it("should log to the console", () => {
    //act
    loggerMiddleware(req, res, next);
    //assert
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("should move to next middleware", () => {
    //act
    loggerMiddleware(req, res, next);
    //assert
    // toHaveBeenCalled() is not enough, we need to make sure
    // it was called with no args
    expect(next).toHaveBeenCalledWith();
  });
});