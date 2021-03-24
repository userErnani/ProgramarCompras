const express = require('express');
const userController = require('../controllers/userController');
      router = express()

//router.get('/home', (req, res) => {res.render('../templates/home')})
router.get('/dashboard', (req, res) => {res.render('../templates/dashboard')})

router.get('/list_pedidos', userController.listPedidos)


router.get('/insert_pedido', (req, res) => {res.render('../templates/insert_pedido')})
router.post('/insert_pedido', userController.insertPedido)

router.get('/insert_op/:id', userController.matprimaOP)
router.post('/insert_op/:projectId', userController.insertOP)

router.get('/edit/:id', userController.loadPedido)
router.post('/edit/:id', userController.editPedido)

router.get('/editop/:id', userController.loadOP)
router.post('/editop/:id', userController.editOP)

router.delete('/deletemp/:id', userController.deletePedido)
router.delete('/deleteop/:id', userController.deleteOP)


router.post('/teste', userController.insertOP)


 
module.exports = router