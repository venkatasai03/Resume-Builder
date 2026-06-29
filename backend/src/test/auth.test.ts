import { describe, expect, it, vi } from "vitest";
import { request } from "./setup";

vi.mock("googleapis", () => {
  return {
    google: {
      auth: {
        OAuth2: vi.fn().mockImplementation(() => {
          return {
            getTokenInfo: vi.fn().mockResolvedValue({
              email: "lukk@gmail.com",
            }),
          };
        }),
      },
    },
  };
});

const email = `testuser+${Date.now()}@example.com`;

describe("Auth Flow", () => {
  it("should let people register and login a user", async () => {
    const registerRes = await request.post("/api/auth/register").send({
      name: "testify",
      email: email,
      password: "Test@123456",
    });

    expect(registerRes.statusCode).toBe(201);
    expect(registerRes.body.message).toBe("User registered successfully!");

    const loginRes = await request.post("/api/auth/login").send({
      email: email,
      password: "Test@123456",
    });

    let token = loginRes.body.token;

    expect(loginRes.statusCode).toBe(201);
    expect(loginRes.body).toHaveProperty("token");
  });

  it("should let user to login or register using google", async () => {
    const googleRes = await request.post("/api/auth/google").send({
      token: "some_mock_token",
    });

    expect(googleRes.statusCode).toBe(200);
    expect(googleRes.body).toHaveProperty("token");
    expect(googleRes.body.user.email).toBe("lukk@gmail.com");
  });
});
