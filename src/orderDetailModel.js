const mongoose = require("mongoose");

const orderDetailSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  id_order: { type: mongoose.Schema.Types.ObjectId, ref: 'orders', required: true },
  id_menu: { type: mongoose.Schema.Types.ObjectId, ref: 'menus', required: true }
},
{
    timetamp: true,
    versionKey: false
});

const ModelOrderDetail = mongoose.model("orderDetails", orderDetailSchema);

module.exports = ModelOrderDetail;