import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Eletrodomestico } from "./eletrodomestico.entity";

@Entity("arranjos")
export class Arranjo {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Eletrodomestico, { eager: true })
  @JoinColumn({ name: "eletrodomestico_id" })
  eletrodomestico!: Eletrodomestico;

  @Column({ type: "date" })
  data_arranjo!: Date;

  @Column({ type: "text", nullable: true })
  descricao?: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  preco_pago!: number;
}
