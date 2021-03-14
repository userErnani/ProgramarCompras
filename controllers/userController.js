// nome que vai ser usado para falar com o BD
const MateriaPrima = require('../models/MateriaPrima') // chamando o banco de dados para cadastrar usuarios
const OrdemProducao = require('../models/OrdemProducao') // chamando o banco de dados para cadastrar usuarios


const str_data = require('../arquivos_acesso/conversor_data')


const userController = {

    insertPedido: async function (req, res) {

        try {
       
            const programar_ops = req.body.programarops
    
            const materiaprima = await MateriaPrima.create(req.body)
    
            // await Promise.all(programar_ops.map( async programar_op => {
    
       
            //         })
    
            //      await MPprogramarop.save()
    
                // materiaprima.programar_op.push(programar_op)
        
        //    }))
    
            await materiaprima.save()
   
            res.redirect('/user/list_pedidos')
        
    
        } catch (error) {
            console.log(error);
            return res.status(400).send({error}) // 'Erro na criação da coleção no banco de dados'})
        }
        },

    insertOP: async function (req, res) {

        const adicop = new OrdemProducao(req.body)

        // const adicop = new OrdemProducao({
            // num_op: req.body.num_op,
            // cliente: req.body.cliente,
            // dt_ped_op: req.body.dt_ped_op,
            // prev_faturamento: req.body.prev_faturamento,
            // qtd_linear: req.body.qtd_linear,
            // obs_op: req.body.obs_op,
            // resultado: req.body.resultado
        // })
        try {
            const saveOp = await adicop.save()
            //res.send('Cadastrado com sucesso !!!!!')
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
        //nome para alterar o array
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
            let doc = await MateriaPrima.updateOne({ _id: id }, progped)
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
            //res.send('deletado')
            res.redirect('/user/list_ops')
        }
        catch (error) {
            res.status(404).send(error)
        }
    },

    listPedidos: async function (req, res) {

        try {
            let materiaprima = await MateriaPrima.find({}).sort({ name: 1 })

            res.render('../templates/list_pedidos', { programarops: materiaprima, error: false, body: {} })
        } catch (error) {
            res.status(404).send(error)
        }
    }, 

    listOps: async function (req, res) {

        try {
            let docs = await OrdemProducao.find({}).sort({ name: 1 })

            res.render('../templates/list_ops', { adicops: docs, error: false, body: {} })
            //res.send('Passei aqui')
        } catch (error) {
            res.status(404).send(error)
        }
    }  

}

module.exports = userController


