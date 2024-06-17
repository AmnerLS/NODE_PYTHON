const mongoose = require("mongoose");

// Database scheme
const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Boolean, required: true },
    comments: [{
      username: { type: String, required: false },  
      comment: { type: String, required: false }
    }],
    scores: [{
      score: { type: Number, required: false }      
    }],
    id_food: { type: mongoose.Schema.Types.ObjectId, ref: 'foods', required: true } 
  },
  {
    timetamp: true,
    versionKey: false
  });

const ModelMenu = mongoose.model("menus", menuSchema); 

module.exports = ModelMenu;