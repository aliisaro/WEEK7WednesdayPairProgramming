const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");

beforeAll(async () => {
  await User.deleteMany({});
});

describe("User Routes", () => {
  //TEST /api/users/signup
  describe("POST /api/users/signup", () => {
    it("should signup a new user with valid credentials", async () => {
      //User data for testing
      const userData = {
        email: "test@email.com",
        password: "R3g5T7#gh",
      };

      //Send user data to /api/users/signup
      const response = await api.post("/api/users/signup").send(userData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it("it should return error with invalid credentials", async () => {
      //User data for testing
      const userData = {
        email: "test@email.com",
        password: "password",
      };

      //Send user data to /api/users/signup
      const response = await api.post("/api/users/signup").send(userData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });
});

describe("User Routes", () => {
  //TEST /api/users/login
  describe("POST /api/users/login", () => {
    it("should login a new user with valid credentials", async () => {
      //User data for testing
      const userData = {
        email: "test@email.com",
        password: "R3g5T7#gh",
      };

      //Send user data to /api/users/login
      const response = await api.post("/api/users/login").send(userData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it("it should return error with invalid credentials", async () => {
      //User data for testing
      const userData = {
        email: "test@email.com",
        password: "password",
      };

      //Send user data to /api/users/login
      const response = await api.post("/api/users/login").send(userData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
