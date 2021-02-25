import { Entity, EntityRepository, Repository } from "typeorm"; // aqui libera para customizar o repository
import { User } from "../models/User"; // pega o model para mapear as funcionalidades para o user

@EntityRepository(User)
class UsersRepository extends Repository<User> { // Aqui pega as utilidades do repositório para poder liberar create, update...

}

export { UsersRepository }