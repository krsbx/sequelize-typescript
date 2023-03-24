import express from 'express';
import { config as dotenvConfig } from 'dotenv';
import db from './models';

dotenvConfig();

const PORT = +(process.env?.PORT ?? 3001);
const app = express();

db.sequelize.sync();

app.listen(PORT, () => {
  console.log(`Server are running @ port ${PORT} `);
});
