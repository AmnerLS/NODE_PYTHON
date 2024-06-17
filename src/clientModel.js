const mongoose = require("mongoose")

//Database scheme

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {type: String, required: true},
    password: {type: String, required: true},
    institution: {type: Boolean, required: true},
    favoriteMenus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'menus' }]
  },
  {
    timetamp: true,
    versionKey: false
  })

    const ModelClient = mongoose.model("clients", clientSchema)

    module.exports = ModelClient;

    