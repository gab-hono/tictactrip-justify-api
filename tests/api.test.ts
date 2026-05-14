import request from "supertest";
import app from "../src/index";
import { server } from "../src/index";

describe("POST /api/token", () => {

    it("should return a token when given a valid email", async () => {
        const res = await request(app)
            .post("/api/token")
            .send({ email: "gabriel@test.com" });
        
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("token");
        expect(typeof res.body.token).toBe("string");
    });

    it("should return 400 if no email is provided", async () => {
        const res = await request(app)
            .post("/api/token")
            .send({});
        
        expect(res.status).toBe(400);
    });

});

describe("POST /api/justify", () => {

    let token: string;

    beforeEach(async () => {
        const res = await request(app)
            .post("/api/token")
            .send({ email: "gabriel@test.com" });
        token = res.body.token;
    });

    it("should return 401 if no token is provided", async () => {
        const res = await request(app)
            .post("/api/justify")
            .set("Content-Type", "text/plain")
            .send("Hello world");
        
        expect(res.status).toBe(401);
    });

    it("should return 401 if token is invalid", async () => {
        const res = await request(app)
            .post("/api/justify")
            .set("Authorization", "Bearer invalidtoken")
            .set("Content-Type", "text/plain")
            .send("Hello world");
        
        expect(res.status).toBe(401);
    });

    it("should return justified text with valid token", async () => {
        const res = await request(app)
            .post("/api/justify")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "text/plain")
            .send("La derniere fois que j'ai voyage c'etait au Chili pour voir ma famille. Je suis alle en avion et tout s'est tres bien passe.");
        
        expect(res.status).toBe(200);
        expect(res.headers["content-type"]).toMatch("text/plain");
        const lines = res.text.split("\n");
        lines.slice(0, -1).forEach(line => {
            expect(line.length).toBe(80);
        });
    });

    it("should return 400 if body is empty", async () => {
        const res = await request(app)
            .post("/api/justify")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "text/plain")
            .send("");
        
        expect(res.status).toBe(400);
    });

});

afterAll(() => {
    server.close();
});