import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Eletrodomestico } from "./eletrodomestico.entity";

@Entity("vendas")
export class Venda {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Eletrodomestico, { eager: true })
  @JoinColumn({ name: "eletrodomestico_id" })
  eletrodomestico!: Eletrodomestico;

  @Column({ type: "date" })
  data_venda!: Date;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  preco_venda!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.00 })
  gastos!: number;

  @Column({ type: "int" })
  garantia_meses!: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  contacto_comprador!: string;
}
