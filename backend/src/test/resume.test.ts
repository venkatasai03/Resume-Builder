import { describe, expect, it, beforeEach, beforeAll } from "vitest";
import { request } from "./setup";
import { resumeData } from "../utils/data.js";

let token: string;
let id: string;

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

  const res = await request
    .post("/api/resumes/generate")
    .set("Authorization", `Bearer ${token}`)
    .send(resumeData);

  console.log("Resume creation response body:", res.body);

  id = res.body._id || res.body.id;
  console.log(id);
});

describe("Resume API", () => {
  it("should generate a resume", async () => {
    const genRes = await request
      .post("/api/resumes/generate")
      .set("Authorization", `Bearer ${token}`)
      .send(resumeData);

    expect(genRes.status).toBe(200);
  });

  it("should get all resumes", async () => {
    const getRes = await request
      .get("/api/resumes/")
      .set("Authorization", `Bearer ${token}`);

    expect(getRes.status).toBe(200);
  });

  it("should get specific resume", async () => {
    console.log("Token:", token);
    console.log("Resume ID:", id);
    const specRes = await request
      .get(`/api/resumes/${id}`)
      .set("Authorization", `Bearer ${token}`);

    console.log("Response status:", specRes.status);
    console.log("Response body:", specRes.body);
    expect(specRes.status).toBe(200);
  });

  it("should delete specific resume", async () => {
    const delRes = await request
      .delete(`/api/resumes/${id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(delRes.status).toBe(200);
    expect(delRes.body.message).toBe("Resume deleted successfully");
  });
});
