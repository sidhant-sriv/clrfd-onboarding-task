import type { Dialect } from 'sequelize';

interface Config {
  [env: string]: {
    dialect: Dialect;
    storage: string;
    logging: boolean;
  };
}

const config: Config = {
  development: {
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: false,
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  },
  production: {
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: false,
  },
};

export default config;
