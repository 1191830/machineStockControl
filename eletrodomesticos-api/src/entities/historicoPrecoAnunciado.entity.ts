import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Eletrodomestico } from "./eletrodomestico.entity";

@Entity("historico_precos_anunciados")
export class HistoricoPrecoAnunciado {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Eletrodomestico, { eager: true })
  @JoinColumn({ name: "eletrodomestico_id" })
  eletrodomestico!: Eletrodomestico;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  preco_anunciado!: number;

  @Column({ type: "date" })
  data_alteracao!: Date;
}
