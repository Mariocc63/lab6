const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Conexión a la base de datos exitosa");    
}).catch(err => {
    console.log('No se puede conectar a la base de datos', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "CRUD pagina de animes"});
});

// Animes routes
require('./app/routes/anime.routes.js')(app);

app.listen(port, () => {
    console.log("Server listening en el puerto 4000");
});
