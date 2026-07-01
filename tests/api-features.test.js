const request = require("supertest");
const app = require("../server");

test("GET /api/features returns feature flags as JSON", async () => {
  const response = await request(app).get("/api/features");

  expect(response.statusCode).toBe(200);
  expect(response.headers["content-type"]).toMatch(/json/);
  expect(response.body).toBeDefined();
});
