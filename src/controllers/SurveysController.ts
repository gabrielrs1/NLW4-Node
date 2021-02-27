import { Request, response, Response } from "express"
import { getCustomRepository } from "typeorm"
import { AppError } from "../errors/AppError"
import { SurveysRepository } from "../repository/SurveysRepository"
import * as yup from "yup"

class SurveysController {
    async create(request: Request, response: Response) {
        const { title, description } = request.body

        const schema = yup.object().shape({
            title: yup.string().required(),
            description: yup.string().required()
        })
        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (error) {
            throw new AppError(error)
        }
        
        const surveysRepository = getCustomRepository(SurveysRepository)
    
        const survey = surveysRepository.create({
            title,
            description
        })
        
        await surveysRepository.save(survey)

        return response.status(201).json(survey) 
    }

    async show(request: Request, response: Response) {
        const surveysRepository = getCustomRepository(SurveysRepository)
       
        const all = await surveysRepository.find()

        return response.json(all)
    }

    async update(request: Request, response: Response) {
        const { id, title, description } = request.body

        const schema = yup.object().shape({
            id: yup.string().required(),
            title: yup.string().required(),
            description: yup.string().required()
        })
        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (error) {
            throw new AppError(error)
        }

        const surveysRepository = getCustomRepository(SurveysRepository)

        const survey = await surveysRepository.findOne({
            id
        })

        if(!survey) {
            throw new AppError("Survey not exists", 404)
        }

        await surveysRepository.update({id: id}, {title: title, description: description})

        return response.status(200).json({message: "Survey updated"})
    }
}

export { SurveysController }