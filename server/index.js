const express = require('express');
require('dotenv').config({path: './config/config.env'});
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const sequelize = require('./config/db');

app.get('/', (req, res) => {
    res.send('Welcome to Shopco API');
});
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);


sequelize.sync({force: false, alter: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
    });
    console.log('Database synced');
});