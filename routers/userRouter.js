const express = require('express');
const userController = require('../controllers/userController');
      router = express()

//router.get('/home', (req, res) => {res.render('../templates/home')})
router.get('/home', (req, res) => {res.render('../templates/home')})

router.get('/list_pedidos', userController.listPedidos)

router.get('/insert_pedido', (req, res) => {res.render('../templates/insert_pedido')})
router.post('/insert_pedido', userController.insertPedido)

router.get('/insert_op/:projectId', userController.loadInsertOP)
router.post('/insert_op/', userController.insertOP)

router.get('/edit_ped/:id', userController.loadPedido)
router.post('/edit_ped/:id', userController.editPedido)

router.get('/edit_op/:id', userController.loadOP)
router.post('/edit_op/:id', userController.editOP)

router.delete('/delete_mp/:id', userController.deletePedido)
router.get('/delete_op/:id', userController.deleteOP)

router.post('/teste', userController.insertOP)


 
module.exports = router