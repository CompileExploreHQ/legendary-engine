import { CorsOptions } from "apollo-server-express";
import { AppConfig, IConfig, V1Config } from "./IConfig";
import {
  OptionsJson as BodyParserOptions,
  OptionsUrlencoded,
} from "body-parser";
import "../v1/dotenv";

// Removing the JSON filename causes problems with Typescript's module resolver
import { name, version } from "../../package.json";

export class ConfigImpl implements IConfig {
  appConfig: AppConfig = {
    env: process.env.NODE_ENV || "development",
    name: process.env.APP_NAME || name,
    version,
    build: process.env.BUILD_VERSION || "",
    host: process.env.APP_HOST || "localhost",
    // FIXME: rename to APP_PORT when doing dotenv changes
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5010,
    ssl: {
      enabled: process.env.APP_SSL_ENABLED === "true",
      key: process.env.APP_SSL_KEY,
      cert: process.env.APP_SSL_CERTIFICATE,
    },
  };

  // express body-parser config
  // https://github.com/expressjs/body-parser
  bodyParserConfig: BodyParserOptions = {
    limit: "10mb",
  };

  // express cors config
  // https://github.com/expressjs/cors
  corsConfig: CorsOptions = {
    // FIXME: rename to CORS_ORIGIN when doing dotenv changes
    origin: process.env.CORS_ALLOWED?.split(",") || "*",
    methods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Session"],
    exposedHeaders: [
      "Content-Length",
      "X-Request-Id",
      "nt",
      "Content-Disposition",
    ],
    credentials: true,
  };

  // express urlencoded config
  // http://expressjs.com/en/resources/middleware/body-parser.html#bodyparserurlencodedoptions
  urlEncodedConfig: OptionsUrlencoded = {
    extended: true,
  };

  // v1 configs
  // we will remove these as they are updated and/or made redundant by v2 work
  v1: V1Config = {
    postgresConfig: {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      user: process.env.DB_USER || "postgres",
      pass: process.env.DB_PASSWORD,
      db: process.env.DB_DATABASE || "event-management",
      ssl: {
        enabled: process.env.DB_SSL_ENABLED === "true",
        key: process.env.DB_SSL_KEY,
        cert: process.env.DB_SSL_CERTIFICATE,
        ca: process.env.DB_SSL_CA,
      },
      max: process.env.DB_MAX_CONNECTIONS
        ? parseInt(process.env.DB_MAX_CONNECTIONS, 10)
        : 50,
      min: process.env.DB_MIN_CONNECTIONS
        ? parseInt(process.env.DB_MIN_CONNECTIONS, 10)
        : 5,
      connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT
        ? parseInt(process.env.DB_CONNECTION_TIMEOUT, 10)
        : 60000,
      idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT
        ? parseInt(process.env.DB_IDLE_TIMEOUT, 10)
        : 60000,
      enableOverlyVerboseLogging:
        process.env.DB_ENABLE_OVERLY_VERBOSE_LOGGING === "true",
    },

    mongoDbConfig: {
      url: process.env.DB_URL || "",
    },
  };
}
