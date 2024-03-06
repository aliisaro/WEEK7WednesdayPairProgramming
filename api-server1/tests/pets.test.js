
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Pet = require("../models/petModel");
const pets = [
  {
    "name": "Sample name",
    "species": "Sample species",
    "age": 0
  },
  {
    "name": "Sample name",
    "species": "Sample species",
    "age": 0
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

describe("Given there are initially some pets saved", () => {
  beforeEach(async () => {
    await Pet.deleteMany({});
    await api
      .post("/api/pets")
      .set("Authorization", "bearer " + token)
      .send(pets[0])
      .send(pets[1]);
  });

  it("should return all pets as JSON when GET /api/pets is called", async () => {
    await api
      .get("/api/pets")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should create one pet when POST /api/pets is called", async () => {
    const newPet = {
      name: "testname",
      species: "testspecies",
      age: 10,
    };
    await api
      .post("/api/pets")
      .set("Authorization", "bearer " + token)
      .send(newPet)
      .expect(201);
  });
  
  it("should return one pet by ID when GET /api/pets/:id is called", async () =>  {
    const pet = await Pet.findOne();
    await api
      .get("/api/pets/" + pet._id)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should update one pet by ID when PUT /api/pets/:id is called", async () => {
    const pet = await Pet.findOne();
    const updatedPet = {
      name: "testname",
      species: "testspecies",
      age: 10,
    };
    await api
      .put("/api/pets/" + pet._id)
      .set("Authorization", "bearer " + token)
      .send(updatedPet)
      .expect(200);
    const updatedPetCheck = await Pet.findById(pet._id);
    expect(updatedPetCheck.toJSON()).toEqual(expect.objectContaining(updatedPet));
  });

  it("should delete one pet by ID when DELETE /api/pets/:id is called", async () => {
    const pet = await Pet.findOne();
    await api
      .delete("/api/pets/" + pet._id)
      .set("Authorization", "bearer " + token)
      .expect(200);
    const petCheck = await Pet.findById(pet._id);
    expect(petCheck).toBeNull();
  });
 
});

afterAll(() => {
  mongoose.connection.close();
});
