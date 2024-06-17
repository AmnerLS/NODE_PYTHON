const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  status: { type: String, required: true, enum: ['pending', 'completed', 'cancelled'] },
  total: { type: Number, required: true },
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'clients', required: true }
},
{
    timetamp: true,
    versionKey: false
});

const ModelOrder = mongoose.model("orders", orderSchema);

module.exports = ModelOrder;