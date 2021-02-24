import { Entity, EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

@EntityRepository(User)
class UsersRepository extends Repository<User> { // Aqui pega as utilizades do repositório

}

export { UsersRepository }