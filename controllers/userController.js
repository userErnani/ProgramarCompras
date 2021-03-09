const Papeis = require('../models/MatPrima')
 // chamando o banco de dados para cadastrar as MP
const Ops = require('../models/Prog_Ops')
 // chamando o banco de dados para cadastrar as OPs

const userController = {

    insertPedido: async function (req, res) {

        const progped = new Papeis(req.body)
        try {
            const saveUsed = await progped.save()
            res.redirect('/user/list_pedidos')
        } catch (error) {
            res.status(400).send(error)
        }
    },

    // esta rota cadastra em outro banco de dados
    insertOP: async function (req, res) {

        const adicop = new Ops(req.body)

        try {
            const saveOp = await adicop.save()
            res.redirect('/user/list_ops')
        } catch (error) {
            res.status(400).send(error)
        }
    },
    loadPedido: async function (req, res) {

        let id = req.params.id
        try {
            let doc = await Papeis.findById(id)
            res.render('../templates/edit_pedido', { error: false, body: doc })
        }
        catch (error) {
            res.status(404).send(error);
        }
    },
    editPedido: async function (req, res) {
        let progped = {}

            progped.pedido = req.body.pedido,
            progped.dtpedido = req.body.dtpedido,
            progped.preventrega = req.body.preventrega,
            progped.fornecedor = req.body.fornecedor,
            progped.material = req.body.material,
            progped.largura = req.body.largura,
            progped.quantidade = req.body.quantidade,
            progped.linear = req.body.linear,
            progped.total = req.body.total

        let id = req.params.id

        if (!id) {
            id = req.body.id
        }
        try {
            let doc = await Papeis.updateOne({ _id: id }, progped)
            res.redirect('/user/list_pedidos')
        } catch (error) {
            res.status(400).send(error)
        }
    },
    deletePedido: async function (req, res) {

        let id = req.params.id

        if (!id) {
            id = req.body.id
        }
        try {
            let doc = await Papeis.findByIdAndDelete(id)
            res.redirect('/user/list_pedidos')
        }
        catch (error) {
            res.status(404).send(error)
        }
    },
    deleteOP: async function (req, res) {

        let id = req.params.id

        if (!id) { 
            id = req.body.id
        }
        try {
            let doc = await Ops.findByIdAndDelete(id)
            //res.send('deletado')
            res.redirect('/user/list_ops')
        }
        catch (error) {
            res.status(404).send(error)
        }
    },

    listPedidos: async function (req, res) {

        try {
            let docs = await Papeis.find({}).sort({ name: 1 })

            res.render('../templates/list_pedidos', { progpeds: docs, error: false, body: {} })
        } catch (error) {
            res.status(404).send(error)
        }
    }, 
    listOps: async function (req, res) {

        try {
            let docs = await Ops.find({}).sort({ name: 1 })

            res.render('../templates/list_ops', { adicops: docs, error: false, body: {} })
            //res.send('Passei aqui')
        } catch (error) {
            res.status(404).send(error)
        }
    }  

}

module.exports = userController


