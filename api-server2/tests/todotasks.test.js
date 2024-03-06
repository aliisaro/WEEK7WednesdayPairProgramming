
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const TodoTask = require("../models/todoTaskModel");
const todotasks = [
  {
    "title": "Sample title",
    "description": "Sample description",
    "dueDate": "2024-03-05T17:34:12.248Z",
    "completed": false
  },
  {
    "title": "Sample title",
    "description": "Sample description",
    "dueDate": "2024-03-05T17:34:12.248Z",
    "completed": false
  }
];

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/users/signup")
    .send({ email: "mattiv@matti.fi", password: "R3g5T7#gh" });
  token = result.body.token;
});

describe("Given there are initially some todotasks saved", () => {
  beforeEach(async () => {
    await TodoTask.deleteMany({});
    await api
      .post("/api/todotasks")
      .set("Authorization", "bearer " + token)
      .send(todotasks[0])
      .send(todotasks[1]);
  });

  it("should return all todotasks as JSON when GET /api/todotasks is called", async () => {
    await api
      .get("/api/todotasks")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should create one todotask when POST /api/todotasks is called", async () => {
    const newTodoTask = {
      title: "testtitle",
      description: "testdescription",
      dueDate: new Date(),
      completed: false,
    };
    await api
      .post("/api/todotasks")
      .set("Authorization", "bearer " + token)
      .send(newTodoTask)
      .expect(201);
  });
  
  it("should return one todotask by ID when GET /api/todotasks/:id is called", async () =>  {
    const todotask = await TodoTask.findOne();
    await api
      .get("/api/todotasks/" + todotask._id)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should update one todotask by ID when PUT /api/todotasks/:id is called", async () => {
    const todotask = await TodoTask.findOne();
    const updatedTodoTask = {
      title: "testtitle",
      description: "testdescription",
      dueDate: new Date(),
      completed: false,
    };
    await api
      .put("/api/todotasks/" + todotask._id)
      .set("Authorization", "bearer " + token)
      .send(updatedTodoTask)
      .expect(200);
    const updatedTodoTaskCheck = await TodoTask.findById(todotask._id);
    expect(updatedTodoTaskCheck.toJSON()).toEqual(expect.objectContaining(updatedTodoTask));
  });

  it("should delete one todotask by ID when DELETE /api/todotasks/:id is called", async () => {
    const todotask = await TodoTask.findOne();
    await api
      .delete("/api/todotasks/" + todotask._id)
      .set("Authorization", "bearer " + token)
      .expect(200);
    const todotaskCheck = await TodoTask.findById(todotask._id);
    expect(todotaskCheck).toBeNull();
  });
 
});

afterAll(() => {
  mongoose.connection.close();
});
