const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Movie = require("../models/movieModel");

const movies = [
{
    title: "sample title",
    director: "sample director",
    genre: "sample genre",
    releaseYear: 2020,
    rating: 8,
},
{
    title: "sample title",
    director: "sample director",
    genre: "sample genre",
    releaseYear: 2020,
    rating: 8,
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

describe("Given there are initially some movies saved", () => {
    beforeEach(async () => {
      await Movie.deleteMany({});
      await api
        .post("/api/movies")
        .set("Authorization", "bearer " + token)
        .send(movies[0])
        .send(movies[1]);
    });

  //GET ALL MOVIES
  it("should return all movies as JSON when GET /api/movies is called", async () => {
    await api
      .get("/api/movies")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  //CREATE Movie
  it("should create one movie when POST /api/movie is called", async () => {
    const movie = {
      title: "title",
      director: "director",
      genre: "genre",
      releaseYear: 2012,
      rating: 9,
    };
    await api
      .post("/api/movies")
      .set("Authorization", "bearer " + token)
      .send(movie)
      .expect(201);
  });

  //GET Movie BY ID
  it("should return one movie by ID when GET /api/movies/:id is called", async () => {
    const movie = await Movie.findOne();
    await api
      .get("/api/movies/" + movie._id)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

  //UPDATE movie BY ID
    it("should update one movie by ID when PUT /api/movies/:id is called", async () => {
        const movie = await Movie.findOne();
        const updatedmovie = {
            title: "newtitle",
            director: "newdirector",
            genre: "newgenre",
            releaseYear: 2011,
            rating: 10,
        };
        await api
        .put("/api/movies/" + movie._id)
        .set("Authorization", "bearer " + token)
        .send(updatedmovie)
        .expect(200);
        
        const updatedmovieCheck = await Movie.findById(movie._id);
        expect(updatedmovieCheck.toJSON()).toEqual(expect.objectContaining(updatedmovie));
    });

    //DELETE movie BY ID
    it("should delete movie by ID when DELETE api/movies/:id is called", async () => {
        const movie = await Movie.findOne();
        await api
        .delete("/api/movies/" + movie._id)
        .set("Authorization", "bearer " + token)
        .expect(200);
        const movieCheck = await Movie.findById(movie._id);
        expect(movieCheck).toBeNull();
    });

afterAll(() => {
mongoose.connection.close();
});
  