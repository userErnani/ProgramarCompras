const mongoose = require('../connectionDb/index')

const ProjectSchema = new mongoose.Schema({
    
    pedido: {type: Number, required: true, maxlength: 6},
    dtpedido: {type: String, required: true},
    preventrega: {type: String, required:true},
    fornecedor: {type: String, required: true, maxlength: 10},
    material: {type: String, required: true},
    largura: {type: Number, required:true, maxlength: 3},
    quantidade: {type: Number, required: true, maxlength: 3},
    linear: {type: Number, required: true, maxlength: 6},
    total: {type: Number, maxlength: 6},
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
})

module.exports = mongoose.model('Project', ProjectSchema)