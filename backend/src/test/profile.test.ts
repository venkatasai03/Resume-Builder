import { describe, expect, it, beforeEach } from "vitest";
import { request } from "./setup";

let token: string;

let email: string;

beforeEach(async () => {
  email = `testuser+${Date.now()}@example.com`;
  await request.post("/api/auth/register").send({
    name: "User",
    email: email,
    password: "Password@123",
  });

  const loginRes = await request.post("/api/auth/login").send({
    email: email,
    password: "Password@123",
  });

  token = loginRes.body.token;
});

describe("Profile Flow", () => {
  it("should return user profile", async () => {
    const userRes = await request
      .get("/api/profile/")
      .set("Authorization", `Bearer ${token}`);

    expect(userRes.statusCode).toBe(200);
    expect(userRes.body).toMatchObject({
      name: "User",
      email: email,
    });
  });
});

describe("PUT /update", () => {
  it("should update user profile", async () => {
    const updateRes = await request
      .put("/api/profile/update")
      .send({
        name: "User",
        email: email,
        password: "Password@123",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body).toMatchObject({
      name: "User",
      email: email,
    });
  });
});
