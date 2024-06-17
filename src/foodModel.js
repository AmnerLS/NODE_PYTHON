const mongoose = require("mongoose")

//Database scheme

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    category: { type:String, required: true},
    price: { type: Number, required: true },
    availability: { type: Boolean, required: true }
  },
  {
    timetamp: true,
    versionKey: false
  })

    const ModelFood = mongoose.model("foods", foodSchema)

    module.exports = ModelFood;
