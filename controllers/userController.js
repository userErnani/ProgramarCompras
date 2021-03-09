// nome que vai ser usado para falar com o BD
const Papeis = require('../models/MatPrima') // chamando o banco de dados para cadastrar usuarios
const Ops = require('../models/Prog_Ops') // chamando o banco de dados para cadastrar usuarios


const str_data = require('../arquivos_acesso/conversor_data')


const userController = { 

    insertPedido: async function (req, res) {

        // const progped = new Papeis({
            

            // pedido: req.body.pedido,
            // dtpedido: req.body.dtpedido,
            // preventrega: req.body.preventrega,
            // fornecedor: req.body.fornecedor,
            // material: req.body.material,
            // largura: req.body.largura,
            // quantidade: req.body.quantidade,
            // linear: req.body.linear,
            // total: req.body.total,
            // op: req.body.op
            //     num_op: req.body.num_op,
            //     cliente: req.body.cliente,
            //     dt_ped_op: req.body.dt_ped_op,
            //     prev_faturamento: req.body.prev_faturamento,
            //     qtd_linear: req.body.qtd_linear,
            //     obs_op: req.body.obs_op,
            //     resultado: req.body.resultado
            // }]      
        
        // })
    //     try {
    //         const saveUsed = await progped.save()
    //         console.log(progped);
    //         // res.send('Cadastrado com sucesso !!!!!')
    //         res.redirect('/user/list_pedidos')
    //     } catch (error) {
    //         res.status(400).send(error)
    //     }

    try {
       
        const progped = await Papeis.create(req.body)

        await Promise.all(ops.map(async op => {

            const matprimaOps = new Ops({...bd_op, matprima: matprima._id})

            await matprimaOps.save()
            
            matprima.ops.push(matprimaOps)

        }))

        await progped.save()

        return res.send({ progped })

    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Erro na criação da coleção no banco de dados'})
    }


    },

    insertOP: async function (req, res) {

        const adicop = new Ops({
            num_op: req.body.num_op,
            cliente: req.body.cliente,
            dt_ped_op: req.body.dt_ped_op,
            prev_faturamento: req.body.prev_faturamento,
            qtd_linear: req.body.qtd_linear,
            obs_op: req.body.obs_op,
            resultado: req.body.resultado
        })
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
            let doc = await Papeis.findById(id)
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
            res.send({docs})
            // res.render('../templates/list_pedidos', { progpeds: docs, error: false, body: {} })
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


