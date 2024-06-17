const mongoose = require('mongoose')

//mongoose.connect('mongodb://database/mydatabase')

mongoose.connect('mongodb://localhost:27018/foodnow')
.then(db => console.log("Conectado por: ", db.connection.host))
.catch(err => console.log(err))