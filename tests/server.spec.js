const request = require("supertest")
const server = require("../index")

describe("Operaciones CRUD de cafes", () => {

  it("Retorna un status code 200 con el  array", async () => {
    const {statusCode: status, body: cafes} = await request(server).get("/cafes").send()
    expect(status).toBe(200);
    expect(cafes).toBeInstanceOf(Array)
  })

  it("codigo 404 si elimina cafe sin id", async () => {
    const jwt = "token";
    const coffeid = 123456789
    const { statusCode: status } = await request(server)
      .delete(`/cafes/${coffeid}`)
      .set("Authorization", jwt)
      .send();
    expect(status).toBe(404)
  })

  it("Agregar Post / devuelve codigo 201", async () => {
    const id = Math.floor(Math.random() * 999)
    const coffe = { id, nombre: "New Coffe"}
    const { statusCode: status } = await request(server)
      .post("/cafes")
      .send(coffe)
    expect(status).toBe(201)
  });

  it("Ruta Put /cafes devuelve 404", async () => {
    const notId = 1313
    const coffe = {id: 1212, nombre: "frapuccino"}
    const { statusCode: status } = await request(server)
      .put(`/cafes/${notId}`)
      .send(coffe)
    expect(status).toBe(400)
  })
})