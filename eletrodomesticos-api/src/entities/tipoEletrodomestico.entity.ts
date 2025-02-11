import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tipo_eletrodomestico")
export class TipoEletrodomestico {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nome!: string;
}
