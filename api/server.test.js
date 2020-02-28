const ask = require("supertest");
const server = require("./server");
const db = require("../data/db-config");

describe("server", () => {
  it("test running", () => {
    expect(true).toBe(true);
  });
});

describe("POST to /api/user", () => {
  beforeEach(async () => {
    await db("user").truncate();
  });
  it("returns status code 200", () => {
    return (
      ask(server)
        .post("/api/user")
        //   Change name everytime test passes
        .send({ name: "boo" })
        .then(res => {
          expect(res.status).toBe(200);
        })
    );
  });

  it("returns JSON", () => {
    return ask(server)
      .post("/api/user")
      .then(res => {
        expect(res.type).toMatch(/json/);
      });
  });
});

describe("Delete to /api/user", () => {
  beforeEach(async () => {
    await db("user").truncate();
  });

  it("returns status 200", () => {
    return ask(server)
      .post("/api/user")
      .send({ name: "deleting" })
      .then(res => {
        return ask(server)
          .delete(`/api/user/${res.id}`)
          .then(response => {
            expect(response.status).toBe(200);
          });
      });
  });

  it("returns message after delete", () => {
    return ask(server)
      .post("/api/user")
      .send({ name: "deleting" })
      .then(res => {
        return ask(server)
          .delete(`/api/user/${res.id}`)
          .then(response => {
            expect(response.body.message).toBe("deleted");
          });
      });
  });

  it("returns JSON", () => {
    return ask(server)
      .post("/api/user")
      .send({ name: "deleting" })
      .then(res => {
        return ask(server)
          .delete(`/api/user/${res.id}`)
          .then(response => {
            expect(response.type).toMatch(/json/);
          });
      });
  });
});
