import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
// import { User } from "../entities/user.entity";
// import { File } from "../entities/file.entity";

export const dbConfig: MysqlConnectionOptions = {
  type: 'mysql',
  database: 'filemanage',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  entities: ["dist/**/*.entity{.ts,.js}"], // [User, File],
  synchronize: true,
};
