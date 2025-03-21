import 'dotenv/config'

const {
  APP_KEY = 'secret',
  APP_EXPIRE_JWT = '1 day',
  APP_PORT = '3000',
  APP_HOST = 'localhost',
  APP_CORS,
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_USER = '',
  DB_PASSWORD = '',
  DB_NAME = '',
} = process.env

export {
  APP_KEY,
  APP_EXPIRE_JWT,
  APP_PORT,
  APP_HOST,
  APP_CORS,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
}