const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.json());

// Mock bug data
let bugs = [];

// Fake routes for testing
app.post("/api/bugs", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "Title required" });
  const newBug = { id: Date.now(), title, status: "open" };
  bugs.push(newBug);
  res.status(201).json(newBug);
});

app.get("/api/bugs", (req, res) => {
  res.json(bugs);
});

describe("Bug API Tests", () => {
  it("should create a new bug", async () => {
    const res = await request(app)
      .post("/api/bugs")
      .send({ title: "Crash on login" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Crash on login");
  });

  it("should not create a bug without title", async () => {
    const res = await request(app).post("/api/bugs").send({});
    expect(res.statusCode).toBe(400);
  });

  it("should get all bugs", async () => {
    const res = await request(app).get("/api/bugs");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});