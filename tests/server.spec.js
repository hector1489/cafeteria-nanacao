const request = require("supertest")
const server = require("../index")

describe("Operaciones CRUD de cafés", () => {
    it("Debería retornar un código de estado 200 y un arreglo", async () => {
        const { statusCode, body } = await request(server).get("/cafes").send()
        expect(statusCode).toBe(200)
        expect(body).toBeInstanceOf(Array)
    })

    it("Debería devolver un código 404 al eliminar un café sin un ID válido", async () => {
        const jwt = "token";
        const idCafe = 123456789
        const { statusCode } = await request(server)
            .delete(`/cafes/${idCafe}`)
            .set("Authorization", jwt)
            .send();
        expect(statusCode).toBe(404);
    })

    it("La ruta POST /cafes debería devolver un código 201 y agregar un café", async () => {
        const id = Math.floor(Math.random() * 999);
        const cafe = { id, nombre: "Nuevo Café" };
        const { statusCode, body } = await request(server)
            .post("/cafes")
            .send(cafe);
        expect(statusCode).toBe(201);
        expect(body).toEqual(expect.arrayContaining([cafe]))
    })

    it("La ruta PUT /cafes debería devolver un código 400", async () => {
        const idNoValido = 1313
        const cafe = { id: 1212, nombre: "frappuccino" }
        const { statusCode } = await request(server)
            .put(`/cafes/${idNoValido}`)
            .send(cafe);
        expect(statusCode).toBe(400)
    })
})
