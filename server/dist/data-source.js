"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const AppDataSource = new typeorm_1.DataSource({
    database: 'productbd',
    type: "mysql",
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '11',
    synchronize: false,
    logging: false,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
    maxQueryExecutionTime: 2000
});
AppDataSource
    .initialize()
    .then(() => {
    console.log("Data Source inicializado!");
})
    .catch((e) => {
    console.error("Erro na inicialização do Data Source:", e);
});
exports.default = AppDataSource;
