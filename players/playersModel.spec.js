const db = require("../data/dbConfig.js");

const request = require("supertest");
const server = require("../api/server.js");

const Players = require("./playersModel.js");

describe("players model", () => {
  beforeEach(async () => {
    await db("players").truncate();
  });

  it("db environment set to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  ////   Post Requests

  describe("insert()", () => {
    it("should insert player into db", async () => {
      await Players.insert({ name: "chris" });
      const players = await db("players");

      expect(players).toHaveLength(1);
    });

    it("should return 200 status code when added", async () => {
      await request(server)
        .post("/players")
        .send({ name: "osgood", position: "goalie" })
        .expect(201);
    });
  });

  ////   Get Requests
  describe("GET /players", () => {
    it("should return 200 status code when get successful", () => {
      return request(server)
        .get("/players")
        .expect(200);
    });

    it("should return json object when successful", () => {
      return request(server)
        .get("/players")
        .then(res => {
          expect(res.type).toMatch(/json/);
        });
    });
  });

  ////   Delete requests
  describe("DELETE /players", () => {
    it("should return 204 status code when successful", async () => {
      await Players.insert({ name: "chris", position: "goalie" });
      await Players.remove(1);
      const players = await db("players");
      expect(players).toHaveLength(0);
    });
    it("should return 500 status code when wrong id deleted", async () => {
      await Players.insert({ name: "chris", position: "goalie" });
      await Players.remove(3);
      expect(500);
    });
  });
});
