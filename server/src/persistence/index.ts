import Knex from "knex";
import { ConfigImpl } from "../config/config";

const configs = new ConfigImpl();
const {
  v1: { postgresConfig },
} = configs;

const knexConfig: any = {
  client: "pg",
  connection: {
    host: postgresConfig.host,
    port: postgresConfig.port,
    user: postgresConfig.user,
    password: postgresConfig.pass,
    database: postgresConfig.db,
    idle_in_transaction_session_timeout: postgresConfig.idleTimeoutMillis,
    connectionTimeoutMillis: postgresConfig.connectionTimeoutMillis,
  },
  pool: {
    // see https://knexjs.org/guide/#pool - could use postgresConfig.min/postgresConfig.max, but at the moment those are very high
    // and we would double those as we are still running in parallel with the old pool
    min: 0,
    max: 10,
  },
  debug: process.env.ENABLE_KNEX_QUERY_LOGGING === "true",
};

if (postgresConfig.ssl?.enabled) {
  knexConfig.connection.ssl = {
    rejectUnauthorized: false,
    ca: postgresConfig.ssl.ca,
    key: postgresConfig.ssl.key,
    cert: postgresConfig.ssl.cert,
  };
}

export const knex = Knex(knexConfig);
