const db = require("../data/dbConfig.js");

const request = require("supertest");
const server = require("../api/server.js");

const Players = require("./playersModel.js");

describe("players model", () => {
  beforeEach(async () => {
    await db("players").truncate();
  });

  describe('insert()', () => {
      it('should insert player into db', async () => {
          await Players.insert({ name: "chris" })
          const players = await db('players')

          expect(players).toHaveLength(1)
      });
      
  });
    it("db environment set to testing", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });

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
});
