const Project = require('../models/project')
const Task = require('../models/task')


const userController = {

    insertPedido: async function (req, res) {

    try {
        const { pedido, dtpedido,
            preventrega, material, fornecedor,
            largura, quantidade, linear, total } = req.body

        // cadastrando e recuperando projeto da coleção
            const project = await Project.create({
            pedido, dtpedido,
            preventrega, material, fornecedor,
            largura, quantidade, linear, total })

            let tasks = [{ "num_op" : "", "cliente" : "", "dt_ped_op" : "",
            "prev_faturamento" : "", "qtd_linear" : "", "obs_op" : "",
            "resultado" : "" }]

        // criando tasks
            await Promise.all(tasks.map(async task => {
            const projectTask = new Task({ ...task, project: project._id })
        // cadastrando na coleção de tasks 
            await projectTask.save()
        // inserindo no array do projeto
            project.tasks.push(projectTask)}))
        // atualizando o projeto com o array de tasks
            await project.save()
            res.redirect('/user/list_pedidos')
        // return res.send({ project })
    } catch (error) {
        res.status(400).send({ error: 'erro ao criar o projeto.' })}
    },
    
    insertOP: async function (req, res) {

    try {
            const { pedido, dtpedido,
            preventrega, material, fornecedor,
            largura, quantidade, linear, total } = req.body

        // alterando e recuperando projeto da coleção
            const project = await Project.findByIdAndUpdate(req.params.projectId, {
            pedido, dtpedido,
            preventrega, material, fornecedor,
            largura, quantidade, linear, total}, { new: true })   
 
        // criando tasks
            const task  = [{}]
            task.num_op = req.body.num_op,
            task.cliente = req.body.cliente,
            task.dt_ped_op = req.body.dt_ped_op,
            task.prev_faturamento = req.body.prev_faturamento,
            task.qtd_linear = req.body.qtd_linear,
            task.obs_op = req.body.obs_op,
            task.resultado = req.body.resultado
    
            const projectTask = new Task({ ...task, project: project._id  })

        // cadastrando na coleção de tasks 
            await projectTask.save()

        // atualizando o projeto com o array de tasks
            await project.save()

            res.redirect('/user/list_pedidos')
//        return res.send({ project })
    } catch (error) {
        console.log(error)
        res.status(400).send({ error: 'erro ao atualizar o projeto.' })
    }
},

    loadOP: async function (req, res) {

        let id = req.params.id
        try {
            let doc = await Project.findById(id)
            res.render('../templates/insert_op',
            { error: false, body: doc })
       //     res.send('passei aqui')
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
        let doc = await Project.updateOne({ _id: id }, editPedido)
        res.redirect('/user/list_pedidos')
    } catch (error) {
        res.status(400).send(error)
    }
},
loadPedido: async function (req, res) {

    let id = req.params.id
    try {
        let doc = await Project.findById(id)
        res.render('../templates/edit_pedido', { error: false, body: doc })
    }
    catch (error) {
        res.status(404).send(error);
    }
},

deletePedido: async function (req, res) {

    let id = req.params.id

    if (!id) {
        id = req.body.id
    }
    try {
        let doc = await Project.findByIdAndDelete(id)
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
        let doc = await Task.findByIdAndDelete(id)
        res.redirect('/user/list_ops')
    }
    catch (error) {
        res.status(404).send(error)
    }
},

listPedidos: async function (req, res) {

        try {
            
            const project = await Project.find({}).populate(['tasks'])

           res.render('../templates/list_pedidos',
                    { listmps: project,
                    error: false, body: {} })  

           // res.send({project})
 
        } catch (error) {
            res.status(400).send({ error: 'erro ao carregar projeto.' })
        }
    },
  
listOps: async function (req, res) {

    try {
        let docs = await Task.find({}).sort({ name: 1 })

        res.render('../templates/list_ops', { listops: docs, error: false, body: {} })
    } catch (error) {
        res.status(404).send(error)
    }
}

}

module.exports = userController


