import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid"

// faz mapeamento da tabela definindo seus tipos de dado a serem recebidos
@Entity("users")
class User {
    @PrimaryColumn()
    readonly id: string

    @Column()
    name: string

    @Column()
    email: string

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { User }