const MateriaPrima = require('../models/MateriaPrima')
const OrdemProducao = require('../models/OrdemProducao')


const userController = {

    insertPedido: async function (req, res) {

        try {


            const { pedido, programarops } = req.body

            const materiaprima = await MateriaPrima.create(req.body)

            await Promise.all(programarops.map(async programarop => {

                const programaropMP = new OrdemProducao({ ...programarop, materiaprima: materiaprima._id })

                await OrdemProducao.save()

                materiaprima.programarops.push(programaropMP)

            }))

            await materiaprima.save()

            //res.send({materiaprima})
            res.redirect('/user/list_pedidos')

        } catch (error) {
            console.log(error);
            return res.status(400).send({ error })
        }
    },

    insertOP: async function (req, res) {

        const insertOP = new OrdemProducao(req.body)

        try {
            const saveOp = await insertOP.save()
            res.redirect('/user/list_ops')
        } catch (error) {
            res.status(400).send(error)
        }
    },

    loadPedido: async function (req, res) {

        let id = req.params.id
        try {
            let doc = await MateriaPrima.findById(id)
            res.render('../templates/edit_pedido', { error: false, body: doc })
        }
        catch (error) {
            res.status(404).send(error);
        }
    },

    editPedido: async function (req, res) {
        let editPedido = {}

            editPedido.pedido = req.body.pedido,
            editPedido.dtpedido = req.body.dtpedido,
            editPedido.preventrega = req.body.preventrega,
            editPedido.fornecedor = req.body.fornecedor,
            editPedido.material = req.body.material,
            editPedido.largura = req.body.largura,
            editPedido.quantidade = req.body.quantidade,
            editPedido.linear = req.body.linear,
            editPedido.total = req.body.total

        let id = req.params.id

        if (!id) {
            id = req.body.id
        }
        try {
            let doc = await MateriaPrima.updateOne({ _id: id }, editPedido)
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
            let doc = await MateriaPrima.findByIdAndDelete(id)
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
            let doc = await OrdemProducao.findByIdAndDelete(id)
            res.redirect('/user/list_ops')
        }
        catch (error) {
            res.status(404).send(error)
        }
    },

    listPedidos: async function (req, res) {

        try {
            let materiaprima = await MateriaPrima.find({}).sort({ name: 1 })

            res.render('../templates/list_pedidos', { listmps: materiaprima, error: false, body: {} })
        } catch (error) {
            res.status(404).send(error)
        }
    },

    listOps: async function (req, res) {

        try {
            let docs = await OrdemProducao.find({}).sort({ name: 1 })

            res.render('../templates/list_ops', { listops: docs, error: false, body: {} })
        } catch (error) {
            res.status(404).send(error)
        }
    }

}

module.exports = userController


