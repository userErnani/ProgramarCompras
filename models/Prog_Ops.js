const mongoose = require('mongoose')

const opSchema = mongoose.Schema({

    num_op: {type: Number, maxlength: 6},
    dt_ped_op: {type: String, required: true},
    prev_faturamento: {type: String, required: true},
    qtd_linear: {type: Number, required: true, maxlength: 5}
})

module.exports = mongoose.model('bd_op', opSchema)
