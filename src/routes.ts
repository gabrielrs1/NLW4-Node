import { Router } from "express"
import { AnswerController } from "./controllers/AnswerContoller"
import { NpsController } from "./controllers/NpsController"
import { SendMailController } from "./controllers/SendMailController"
import { SurveysController } from "./controllers/SurveysController"
import { UserController } from "./controllers/UserController"

const router = Router()

const userController = new UserController()
const surveysController = new SurveysController()
const sendMail = new SendMailController

const answerControlller = new AnswerController()

const npsController = new NpsController()

router.post("/users", userController.create) // Criar o usuário
router.delete("/users/:id", userController.delete) // Deletar o usuário

router.post("/surveys", surveysController.create) // Criar uma enquete
router.get("/surveys", surveysController.show) // Visualizar as enquetes
router.put("/surveys", surveysController.update) // Editar uma enquete

router.post("/sendMail", sendMail.execute)

router.get("/answer/:value", answerControlller.execute)

router.get("/nps/:survey_id", npsController.execute)

export { router }