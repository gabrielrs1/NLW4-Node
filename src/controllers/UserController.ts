import { Request, Response } from "express"
import { getCustomRepository } from "typeorm" // Repositório customizável
import { UsersRepository } from "../repository/UsersRepository" // Repositório criado
import * as yup from "yup"
import { AppError } from "../errors/AppError"

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        })
        // if(!(await schema.isValid(request.body))) {
        //     return response.status(400).json({error: "Validate Failed"})
        // }
        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (error) {
            throw new AppError(error)
        }
        
        // utilizo o repositório que foi criado, com o getcustomrepository
        const usersRepository = getCustomRepository(UsersRepository)

        // procurando se possui email existente no database
        const userAlreadyExists = await usersRepository.findOne({
            email
        })

        // se achou email já registrado
        if(userAlreadyExists) {
            throw new AppError("User already exists!")
        }

        // email não existe, então cria um novo user
        const user = usersRepository.create({
            name,
            email
        })

        // espera ele salva
        await usersRepository.save(user)

        // resposta que deu certo
        return response.status(201).json(user)
    }

    async delete(request: Request, response: Response) {
        var { id } = request.params

        const usersRepository = getCustomRepository(UsersRepository)

        const user = await usersRepository.findOne({
            id
        })

        if(!user) {
            throw new AppError("User not exists", 400);
        }

        await usersRepository.delete({
            id: user.id
        })

        return response.status(200).json({message: "User Deleted"})
    }
}

export { UserController }
