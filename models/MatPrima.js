const mongoose = require('mongoose')
// const bd_op = require('./Prog_Ops')

const pedidoSchema = mongoose.Schema({
    pedido: {type: Number, required: true, maxlength: 6},
    dtpedido: {type: String, required: true},
    preventrega: {type: String, required:true},
    material: {type: String, required: true},
    fornecedor: {type: String, required: true, maxlength: 10},
    largura: {type: Number, required:true, maxlength: 3},
    quantidade: {type: Number, required: true, maxlength: 3},
    linear: {type: Number, required: true, maxlength: 6},
    total: {type: Number, maxlength: 6},
    bd_op: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'bd_op',
        required: true}
    ]
})

module.exports = mongoose.model('bd_matprima', pedidoSchema)
