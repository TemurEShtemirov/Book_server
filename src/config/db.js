import { Sequelize } from "sequelize";
import 'dotenv/config'

const user = process.env.USER_NAME || "postgres";
const pass = process.env.PASDWORD || "1015";
const host = process.env.HOST || "localhost";
const dbname = process.env.DB_NAME || "book";

const sequelize = new Sequelize(`postgres://${user}:${pass}@${host}:5432/${dbname}`);

export default sequelize