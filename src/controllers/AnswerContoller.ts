import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repository/SurveysUsersRepository";

class AnswerController {
    async execute(request: Request, response: Response) {
        // recebe do parametro e na query ( value?u= )
        const { value } = request.params // nota do nps
        const { u } = request.query // id da surveys_users

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)
    
        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        })

        if(!surveyUser) {
            throw new AppError("Survey user does not exists")
        }

        surveyUser.value = Number(value)

        await surveysUsersRepository.save(surveyUser)

        return response.json(surveyUser)
    }
}

export { AnswerController }