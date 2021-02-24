const User = require('../models/MatPrima') // chamando o banco de dados para cadastrar usuarios

// conversão da data para o padrão brasileiro
const str_data = require('../arquivos_acesso/conversor_data')


const userController = {

    insertUser: async function (req, res) {

        function total(){
           console.log('deu certo');
        }
        const user = new User({
            pedido: req.body.pedido,
            dtpedido: req.body.dtpedido,
            preventrega: req.body.preventrega,
            fornecedor: req.body.fornecedor,
            material: req.body.fornecedor,
            largura: req.body.largura,
            quantidade: req.body.quantidade,
            linear: req.body.linear,
            total: req.body.total
        })
        try {
            const saveUsed = await user.save()
            // res.send('Cadastrado com sucesso !!!!!')
            res.render('../templates/dashboard')
        } catch (error) {
            res.status(400).send(error)
        }
    },
    loadUser: async function (req, res) {

        let id = req.params.id
        try {
            let doc = await User.findById(id)
            res.render('../templates/edit_pedido', { error: false, body: doc })
        }
        catch (error) {
            res.status(404).send(error);
        }
    },

    editUser: async function (req, res) {

        let user = {}
        
        user.pedido = req.body.pedido,
        user.dtpedido = req.body.dtpedido,
        user.preventrega = req.body.preventrega,
        user.fornecedor = req.body.fornecedor,
        user.material = req.body.material,
        user.largura = req.body.largura,
        user.quantidade = req.body.quantidade,
        user.linear = req.body.linear,
        user.total = req.body.total
 
        let id = req.params.id

        if (!id) {
            id = req.body.id
        }
        try {
            let doc = await User.updateOne({ _id: id }, user)
            res.redirect('/user/list_pedidos')
        } catch (error) {
            res.status(400).send(error)
        }
    },
    deleteUser: async function (req, res) {

        let id = req.params.id

        if (!id) {
            id = req.body.id
        }
        try {
            let doc = await User.findByIdAndDelete(id)
            res.redirect('/user/list_pedidos')
        }
        catch (error) {
            res.status(404).send(error)
        }
    },
    listUsers: async function (req, res) {

        try {
            let docs = await User.find({}).sort({ name: 1 })

            res.render('../templates/list_pedidos', { users: docs, error: false, body: {} })
        } catch (error) {
            res.status(404).send(error)
        }
    }
}

module.exports = userController


