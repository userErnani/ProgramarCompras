const mongoose = require('../connectionDb/index')

const TaskSchema = new mongoose.Schema({
    
    num_op: {type: String, maxlength: 6},
    cliente: {type: String, maxlength: 25},
    dt_ped_op: {type: String},
    prev_faturamento: {type: String, },
    qtd_linear: {type: String, maxlength: 5},
    obs_op: {type: String, maxlength: 30},
    disponivel: {type: String},
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true }
})

module.exports = mongoose.model('Task', TaskSchema)


