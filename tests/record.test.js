const request = require("supertest");
const Record = require("../src/models/Record");
const app = require("../src/app");

describe("Record", () => {
  test("should get records from db", async () => {
    const response = await request(app)
      .post("/records")
      .send({
        startDate: "2016-01-26",
        endDate: "2018-02-02",
        minCount: 100,
        maxCount: 110,
      })
      .expect(200);

    expect(response.body).toHaveProperty("code");
    expect(response.body).toHaveProperty("records");

    expect(response.body.code).toBe(0);
    expect(response.body.code).toBe(0);
  });
});
