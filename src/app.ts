import "reflect-metadata"
import express from "express"
import createConnection from "./database"
import { router } from "./routes" // importando as rotas

createConnection()
const app = express()

app.use(express.json()) // habilita express receber json
app.use(router) // utilizando as rotas

export { app }