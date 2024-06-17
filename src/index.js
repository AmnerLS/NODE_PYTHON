const express = require("express");

const cors = require('cors'); 

const swagger = require('./swaggerOptions');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const spects = swaggerJsDoc(swagger);
//Generar appweb
const app = express()

require("./database.js");

app.use(cors());

app.use(express.json());


app.use(require("./routes/index.routes.js"));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spects));


app.listen(3000)
console.log("asdasdasd",3000)