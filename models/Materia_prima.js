const mongoose = require('mongoose')

const Materia_primaSchema = mongoose.Schema({
    pedido: {type: Number, required: true, maxlength: 6},
    dtpedido: {type: String, required: true},
    preventrega: {type: String, required:true},
    material: {type: String, required: true},
    fornecedor: {type: String, required: true, maxlength: 10},
    largura: {type: Number, required:true, maxlength: 3},
    quantidade: {type: Number, required: true, maxlength: 3},
    linear: {type: Number, required: true, maxlength: 6},
    total: {type: Number, maxlength: 6},
    programarop: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Programar_op'
        }]
    })



module.exports = mongoose.model('Materia_prima', Materia_primaSchema)
