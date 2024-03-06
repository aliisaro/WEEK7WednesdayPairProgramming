
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Book = require("../models/bookModel");
const books = [
  {
    "title": "Sample title",
    "author": "Sample author",
    "genre": "Sample genre"
  },
  {
    "title": "Sample title",
    "author": "Sample author",
    "genre": "Sample genre"
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

describe("Given there are initially some books saved", () => {
  beforeEach(async () => {
    await Book.deleteMany({});
    await api
      .post("/api/books")
      .set("Authorization", "bearer " + token)
      .send(books[0])
      .send(books[1]);
  });

  it("should return all books as JSON when GET /api/books is called", async () => {
    await api
      .get("/api/books")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should create one book when POST /api/books is called", async () => {
    const newBook = {
      title: "testtitle",
      author: "testauthor",
      genre: "testgenre",
    };
    await api
      .post("/api/books")
      .set("Authorization", "bearer " + token)
      .send(newBook)
      .expect(201);
  });
  
  it("should return one book by ID when GET /api/books/:id is called", async () =>  {
    const book = await Book.findOne();
    await api
      .get("/api/books/" + book._id)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should update one book by ID when PUT /api/books/:id is called", async () => {
    const book = await Book.findOne();
    const updatedBook = {
      title: "testtitle",
      author: "testauthor",
      genre: "testgenre",
    };
    await api
      .put("/api/books/" + book._id)
      .set("Authorization", "bearer " + token)
      .send(updatedBook)
      .expect(200);
    const updatedBookCheck = await Book.findById(book._id);
    expect(updatedBookCheck.toJSON()).toEqual(expect.objectContaining(updatedBook));
  });

  it("should delete one book by ID when DELETE /api/books/:id is called", async () => {
    const book = await Book.findOne();
    await api
      .delete("/api/books/" + book._id)
      .set("Authorization", "bearer " + token)
      .expect(200);
    const bookCheck = await Book.findById(book._id);
    expect(bookCheck).toBeNull();
  });
 
});

afterAll(() => {
  mongoose.connection.close();
});
