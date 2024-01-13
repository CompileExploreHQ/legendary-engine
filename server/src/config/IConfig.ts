import {
  OptionsJson as BodyParserOptions,
  OptionsUrlencoded,
} from "body-parser";
import { CorsOptions } from "cors";

export interface IConfig {
  appConfig: AppConfig;
  bodyParserConfig: BodyParserOptions;
  corsConfig: CorsOptions;
  urlEncodedConfig: OptionsUrlencoded;
  v1: V1Config;
}

export interface AppConfig {
  env: string;
  name: string;
  version: string;
  build: string;
  host: string;
  port: number;
  ssl: {
    enabled: boolean;
    key?: string;
    cert?: string;
  };
}

export interface V1Config {
  postgresConfig: {
    host: string;
    port: number;
    user?: string;
    pass?: string;
    db: string;
    ssl: {
      enabled: boolean;
      key?: string;
      cert?: string;
      ca?: string;
    };
    max?: number;
    min?: number;
    connectionTimeoutMillis?: number;
    idleTimeoutMillis?: number;
    enableOverlyVerboseLogging?: boolean;
  };

  mongoDbConfig: {
    url: string;
  };
}
