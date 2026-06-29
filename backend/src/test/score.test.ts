import { describe, expect, it, beforeEach } from "vitest";
import { request } from "./setup";

let token: string;

beforeEach(async () => {
  const email = `testuser+${Date.now()}@example.com`;

  await request.post("/api/auth/register").send({
    name: "Test User",
    email: email,
    password: "Password@123",
  });

  const loginRes = await request.post("/api/auth/login").send({
    email: email,
    password: "Password@123",
  });

  token = loginRes.body.token;
});

describe("POST /score", () => {
  it("should give a github score", async () => {
    const res = await request
      .post("/api/score/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "testgithub",
      });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      score: 10,
      advice: "Good job",
    });
  });
});
