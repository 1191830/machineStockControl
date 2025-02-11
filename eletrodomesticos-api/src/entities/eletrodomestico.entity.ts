import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    JoinColumn 
  } from "typeorm";
  import { Marca } from "./marca.entity";
  import { TipoEletrodomestico } from "./tipoEletrodomestico.entity";
  
  export enum TipoEletrodomesticoEnum {
    VENDA = "VENDA",
    ARRANJO = "ARRANJO",
  }
  
  @Entity("eletrodomesticos")
  export class Eletrodomestico {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ type: "varchar", length: 100 })
    nome!: string;
  
    @Column({ type: "text", nullable: true })
    descricao?: string;
  
    @Column({ type: "date" })
    data_compra!: Date;
  
    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    preco_compra!: number;
  
    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    preco_anunciado_atual?: number;
  
    @Column({ 
      type: "enum", 
      enum: TipoEletrodomesticoEnum 
    })
    tipo!: TipoEletrodomesticoEnum;
  
    @ManyToOne(() => Marca, { eager: true })
    @JoinColumn({ name: "marca_id" })
    marca!: Marca;
  
    @ManyToOne(() => TipoEletrodomestico, { eager: true })
    @JoinColumn({ name: "tipo_id" })
    tipoEletrodomestico!: TipoEletrodomestico;
  }
  