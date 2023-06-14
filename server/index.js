require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models')
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const app = express();

app.use(cors()); // чтобы отправлять запросы
app.use(express.json()); // чтобы парсить json формат
app.use(express.static(path.resolve(__dirname, 'static'))); // to get static as static
app.use(fileUpload({})) // to add files
app.use('/api', router);

// ПРОВЕРКА, ЧТО ЗАПРОСЫ ОТПРАВЛЯЮТСЯ
// app.get('/',(req, res) => {
//     res.status(200).json({message:'WORKING!!!'})
// })

// Обработка ошибок, последний middleware
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch(e) {
        console.log(e);
    }
}
start();