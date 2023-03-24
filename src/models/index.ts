import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Model } from 'sequelize';
import process from 'process';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.resolve(__dirname, '../config/config.js'))[env];

const db = {} as {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
} & Record<
  string,
  Model<object, object> & {
    associate?: (database: unknown) => void;
  }
>;

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable] ?? '', config)
  : new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default(
      sequelize,
      DataTypes
    );

    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  db[modelName].associate?.(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
