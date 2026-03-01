const express = require('express');
require('dotenv').config({path: './config/config.env'});
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes')
const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const cors = require('cors');
require('./models/models');
const sequelize = require('./config/db');
app.get('/', (req, res) => {
    res.send('Welcome to ShopCo');
});
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use(cors({
    origin: 'http://localhost:3000'
}));

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
    });
    console.log('Database synced');
});