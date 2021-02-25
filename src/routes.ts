import { Router } from "express"
import { SendMailController } from "./controllers/SendMailController"
import { SurveysController } from "./controllers/SurveysController"
import { UserController } from "./controllers/UserController"

const router = Router()

const userController = new UserController()
const surveysController = new SurveysController()
const sendMail = new SendMailController

router.post("/users", userController.create) // Rota de criação de usuário
router.post("/surveys", surveysController.create) // Rota de criação de enquete
router.get("/surveys", surveysController.show) // Rota que mosta todas as enquetes

router.post("/sendMail", sendMail.execute)

export { router }