import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("marcas") // Nome da tabela no banco
export class Marca {
  @PrimaryGeneratedColumn()
  id!: number; // O "!" indica que o TypeORM irá definir esse valor

  @Column({ type: "varchar", length: 100 })
  nome!: string;

  @Column({ type: "varchar", length: 100 })
  categoria!: string;
}
