import { afterAll, beforeAll, beforeEach } from "vitest";
import { clearDatabase, closeDatabase, connect } from "./database";
import supertest, { SuperTest, Test } from "supertest";
import { Server } from "http";
import app from "../configureApp";

const config = app();

let server: Server;
let request: SuperTest<Test>;

beforeAll(async () => {
  await connect();
  server = config.listen(0);
  //@ts-ignore
  request = supertest(server);
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

export { request };
