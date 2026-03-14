const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
    // Use DATABASE_URL for production (e.g., Render)
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: process.env.NODE_ENV === 'production' ? { require: true, rejectUnauthorized: false } : false
        }
    });
} else {
    // Use individual env vars for development
    const dbConfig = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME
    }

    sequelize = new Sequelize(
        dbConfig.database,
        dbConfig.user,
        dbConfig.password,
        {
            host: dbConfig.host,
            dialect: 'postgres',
            logging: false,
        }
    );
}

sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;