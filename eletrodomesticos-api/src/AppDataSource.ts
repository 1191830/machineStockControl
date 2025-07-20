import "reflect-metadata";
import { DataSource } from "typeorm";
import { Marca } from "./entities/marca.entity";
import { TipoEletrodomestico } from "./entities/tipoEletrodomestico.entity";
import { Eletrodomestico } from "./entities/eletrodomestico.entity";
import { HistoricoPrecoAnunciado } from "./entities/historicoPrecoAnunciado.entity";
import { Venda } from "./entities/venda.entity";
import { Arranjo } from "./entities/arranjo.entity";
import { ArranjoRealizado } from "./entities/arranjoRealizado.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true, // Só para desenvolvimento!
  logging: true,
  entities: [
    Marca,
    TipoEletrodomestico,
    Eletrodomestico,
    HistoricoPrecoAnunciado,
    Venda,
    Arranjo,
    ArranjoRealizado,
  ],
  migrations: ["src/migrations/*.ts"],
});
