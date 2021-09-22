import request from "supertest"
import { getConnection } from "typeorm"
import { app } from "../app"

import createConnection from "../database"

describe("Surveys", () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })

    afterAll(async () => {
        const connection = getConnection()
        await connection.dropDatabase()
        await connection.close()
    })
    
    it("Should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys").send({
            title: "Title example",
            description: "Description example"
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
    })

    it("Should be able to get all surveys", async () => {
        await request(app).post("/surveys").send({
            title: "Title example2",
            description: "Description example2"
        })

        const response = await request(app).get("/surveys")

        expect(response.body.length).toBe(2)
    })

    it("Should be able to update a survey", async () => {
        const response = await request(app).get("/surveys")

        let lista = response.body
        let list = lista.map(e => {
            return e.id
        })

        const response1 = await request(app).put("/surveys").send({
            id: list[0], // receber o id do survey
            title: "Title example2222",
            description: "Description example2222"
        })

        expect(response1.status).toBe(200)
    })
})