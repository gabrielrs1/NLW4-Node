import { Request, Response } from "express"
import { getCustomRepository } from "typeorm" // Repositório customizável
import { UsersRepository } from "../repository/UsersRepository" // Repositório criado

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body
        
        // utilizo o repositório que foi criado, com o getcustomrepository
        const usersRepository = getCustomRepository(UsersRepository)

        // procurando se possui email existente no database
        const userAlreadyExists = await usersRepository.findOne({
            email
        })

        // se achou email já registrado
        if(userAlreadyExists) {
            return response.status(400).json({
                error: "User already exists!"
            })
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
}

export { UserController }
