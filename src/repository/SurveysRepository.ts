import { Entity, EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Survey";

@EntityRepository(Survey)
class SurveysRepository extends Repository<Survey> { // Aqui pega as utilizades do repositório

}

export { SurveysRepository }