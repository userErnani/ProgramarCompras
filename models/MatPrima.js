const mongoose = require('mongoose')

const opSchema = mongoose.Schema({
    num_op: {type: Number, maxlength: 6},
    cliente: {type: String, maxlength: 25},
    dt_ped_op: {type: String, required: false},
    prev_faturamento: {type: String, required: false},
    qtd_linear: {type: Number, required: false, maxlength: 5},
    obs_op: {type: String, maxlength: 30},
    resultado: {type: Number},
})


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
    op:
     {type: mongoose.Schema.Types.ObjectId, ref: 'opSchema'}

})



module.exports = mongoose.model('bd_matprima', pedidoSchema)
