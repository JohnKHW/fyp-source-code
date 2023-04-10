import * as Joi from 'joi';
import { ConfigModuleOptions } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { join } from 'path';

class AppConfig {
  public static getInitConfig(): ConfigModuleOptions {
    const validDBTypeList = [
      'mysql',
      'mariadb',
      'postgres',
      'cockroachdb',
      'sqlite',
      'mssql',
      'sap',
      'oracle',
      'cordova',
      'nativescript',
      'react-native',
      'sqljs',
      'mongodb',
      'aurora-data-api',
      'aurora-data-api-pg',
      'expo',
      'better-sqlite3',
      'capacitor',
    ];

    return {
      validationSchema: Joi.object({
        BASE_PATH: Joi.string().allow('').optional(),
        PORT: Joi.number().min(1).max(65535).required(),
        SWAGGER_BASE_PATH: Joi.string().allow('').optional(),
        DB_TYPE: Joi.string()
          .valid(...validDBTypeList)
          .required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().min(1).max(65535).required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    };
  }
  public static getTypeOrmConfig(): TypeOrmModuleAsyncOptions {
    const migrationsDir = join('database', 'migrations');
    const {
      DB_TYPE,
      DB_HOST,
      DB_PORT,
      DB_USERNAME,
      DB_PASSWORD,
      DB_NAME,
      NODE_ENV,
    } = process.env;

    return {
      useFactory: (): TypeOrmModuleOptions => {
        // if (logger) logger.setContext(TypeOrmModule.name);
        return {
          type: DB_TYPE as any,
          host: DB_HOST,
          port: Number(DB_PORT),
          username: DB_USERNAME,
          password: DB_PASSWORD,
          database: DB_NAME,
          synchronize: true,
          entities: [join(__dirname, 'modules/**/*.entity.{ts,js}')],
          migrations: [join(__dirname, migrationsDir, '*.migration.{ts,js}')],
          subscribers: [join(__dirname, 'modules/**/*.subscriber.{ts,js}')],
          retryAttempts: Infinity,
          retryDelay: 10 * 1000,
          extra: {
            // For SQL Server that has self signed certificate error, enable below setting
            // trustServerCertificate: true,
          },
        };
      },
      inject: [],
    };
  }
}

export { AppConfig };
